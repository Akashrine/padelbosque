// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { variablesConfig } from './src/lib/markdown-variables.ts';
import masquerTodo from './src/integrations/masquer-todo.ts';

export default defineConfig({
  site: 'https://padelbosque.fr',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  markdown: {
    processor: satteri({
      mdastPlugins: [variablesConfig],
      // Pas de guillemets ni d'apostrophes typographiques automatiques :
      // le nom du club garde la même apostrophe partout.
      features: { smartPunctuation: false },
    }),
  },
  integrations: [
    masquerTodo(),
    sitemap({
      filter: (page) => !page.includes('/bienvenue-fondateur') && !page.includes('/404'),
    }),
  ],
});
