import { getEntry, render } from 'astro:content';
import { remplir } from './gabarit';

/** Charge une page "systeme" de src/content/pages et remplit ses variables. */
export async function pageSysteme(id: string) {
  const page = await getEntry('pages', id);
  if (!page || page.data.type !== 'systeme') {
    throw new Error(`Page système introuvable : src/content/pages/${id}.md`);
  }
  return {
    ...page.data,
    title: remplir(page.data.title),
    description: remplir(page.data.description),
    h1: remplir(page.data.h1),
    Contenu: (await render(page)).Content,
  };
}
