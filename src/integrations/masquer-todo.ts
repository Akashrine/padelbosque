import type { AstroIntegration } from 'astro';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';

/**
 * En production, retire de chaque page tout bloc qui dépend d'une valeur TODO :
 * paragraphe, élément de liste, ligne de tableau, couple dt/dd, ou élément marqué data-si-todo.
 * Puis retire ce qui devient vide (liste, tableau, question FAQ, section) et les titres orphelins.
 * En dev, rien n'est retiré : les TODO restent surlignés.
 * TODO_VISIBLES=1 désactive le masquage pour un build de relecture.
 * Rapport : rapport-build/todo-masques.json (lu par npm run verifier).
 */

const BLOCS = '[data-si-todo], p, li, tr, dd, dt, h1, h2, h3, h4, summary';
const TITRES = ['H2', 'H3', 'H4'];

type El = ReturnType<typeof parseHTML>['document']['body'];

export interface BlocMasque {
  texte: string;
  questions: string[];
}

const propre = (t: string | null | undefined) => (t ?? '').replace(/\s+/g, ' ').trim();

function estVide(el: El): boolean {
  switch (el.tagName) {
    case 'UL':
    case 'OL':
      return !el.querySelector('li');
    case 'DL':
      return !el.querySelector('dd');
    case 'TABLE':
      return !el.querySelector('tbody tr');
    case 'DETAILS':
      return [...el.children].every((c) => c.tagName === 'SUMMARY');
    case 'SECTION':
    case 'DIV':
    case 'ARTICLE':
    case 'NAV': {
      const utiles = [...el.childNodes].filter((n) =>
        n.nodeType === 3 ? propre(n.textContent) !== '' : n.nodeType === 1 && !TITRES.includes((n as El).tagName) && (n as El).tagName !== 'SCRIPT',
      );
      return utiles.length === 0;
    }
    default:
      return false;
  }
}

const niveau = (el: El) => Number(el.tagName.slice(1));

/** Titre sans contenu avant le prochain titre de même niveau ou plus haut. */
function titresOrphelins(parent: El): El[] {
  const enfants = [...parent.children] as El[];
  return enfants.filter((el, i) => {
    if (!TITRES.includes(el.tagName)) return false;
    const suivant = enfants[i + 1];
    if (!suivant) return true;
    return TITRES.includes(suivant.tagName) && niveau(suivant) <= niveau(el);
  });
}

function nettoyer(depart: Set<El>) {
  let aTraiter = new Set(depart);
  while (aTraiter.size) {
    const suivants = new Set<El>();
    for (const el of aTraiter) {
      if (!el.isConnected) continue;
      for (const t of titresOrphelins(el)) {
        t.remove();
        suivants.add(el);
      }
      if (estVide(el) && el.parentElement && el.tagName !== 'MAIN' && el.tagName !== 'BODY') {
        const parent = el.parentElement as El;
        el.remove();
        suivants.add(parent);
      }
    }
    aTraiter = suivants;
  }
}

export function masquerTodo(html: string): { html: string; masques: BlocMasque[] } {
  const { document } = parseHTML(html);
  const parBloc = new Map<El, string[]>();
  for (const mark of document.querySelectorAll('mark.todo')) {
    const bloc = (mark.closest(BLOCS) ?? mark) as El;
    parBloc.set(bloc, [...(parBloc.get(bloc) ?? []), propre(mark.textContent)]);
  }

  const masques: BlocMasque[] = [];
  const parents = new Set<El>();
  for (const [bloc, questions] of parBloc) {
    const copie = bloc.cloneNode(true) as El;
    copie.querySelectorAll('mark.todo').forEach((m) => m.remove());
    let texte = propre(copie.textContent);
    if (bloc.tagName === 'DD' && bloc.previousElementSibling?.tagName === 'DT') {
      texte = `${propre(bloc.previousElementSibling.textContent)} ${texte}`.trim();
      bloc.previousElementSibling.remove();
    }
    masques.push({ texte, questions });
    if (bloc.parentElement) parents.add(bloc.parentElement as El);
    bloc.remove();
  }

  // Remonte depuis chaque parent touché jusqu'au <main>, pour vider les conteneurs en cascade.
  const ancetres = new Set<El>();
  for (const p of parents) {
    for (let el: El | null = p; el && el.tagName !== 'BODY'; el = el.parentElement as El | null) ancetres.add(el);
  }
  // Les plus profonds d'abord.
  const ordonnes = [...ancetres].sort((a, b) => profondeur(b) - profondeur(a));
  for (const el of ordonnes) nettoyer(new Set([el]));

  return { html: '<!DOCTYPE html>' + document.documentElement.outerHTML, masques };
}

function profondeur(el: El) {
  let n = 0;
  for (let e: El | null = el; e; e = e.parentElement as El | null) n++;
  return n;
}

export default function masquerTodoIntegration(): AstroIntegration {
  return {
    name: 'masquer-todo',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const visibles = process.env.TODO_VISIBLES === '1';
        const racine = fileURLToPath(dir);
        const fichiers = (await readdir(racine, { recursive: true }))
          .filter((f) => f.endsWith('.html'))
          .sort();
        const rapport: Record<string, BlocMasque[]> = {};
        for (const f of fichiers) {
          const chemin = path.join(racine, f);
          const html = await readFile(chemin, 'utf8');
          if (visibles) continue;
          const resultat = masquerTodo(html);
          rapport[f] = resultat.masques;
          await writeFile(chemin, resultat.html);
        }
        if (visibles) {
          logger.info('TODO_VISIBLES=1 : TODO laissés visibles, rapport de masquage inchangé.');
          return;
        }
        await mkdir('rapport-build', { recursive: true });
        await writeFile(
          'rapport-build/todo-masques.json',
          JSON.stringify({ todoVisibles: false, pages: rapport }, null, 2),
        );
        const total = Object.values(rapport).reduce((n, m) => n + m.length, 0);
        logger.info(`${total} bloc(s) dépendant d'un TODO masqué(s).`);
      },
    },
  };
}
