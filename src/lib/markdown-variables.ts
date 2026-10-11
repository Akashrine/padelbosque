import { defineMdastPlugin } from 'satteri';
import { estTodo, motif, valeur } from './gabarit';

type Morceau = { type: 'text'; value: string } | { type: 'html'; value: string };

const echapper = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Découpe un texte : les variables connues sont remplacées, les TODO deviennent des <mark> visibles. */
function decouper(texte: string): Morceau[] {
  const sortie: Morceau[] = [];
  let tampon = '';
  let dernier = 0;
  for (const m of texte.matchAll(new RegExp(motif))) {
    tampon += texte.slice(dernier, m.index);
    const v = valeur(m[1]);
    if (estTodo(v)) {
      if (tampon) sortie.push({ type: 'text', value: tampon });
      tampon = '';
      sortie.push({ type: 'html', value: `<mark class="todo">${echapper(v)}</mark>` });
    } else {
      tampon += v;
    }
    dernier = m.index + m[0].length;
  }
  tampon += texte.slice(dernier);
  if (tampon) sortie.push({ type: 'text', value: tampon });
  return sortie;
}

/** Remplace les {{cle}} des fichiers Markdown par les valeurs de config.ts. */
export const variablesConfig = defineMdastPlugin({
  name: 'variables-config',
  text(node, ctx) {
    if (!node.value.includes('{{')) return;
    ctx.replaceNode(node, decouper(node.value));
  },
});
