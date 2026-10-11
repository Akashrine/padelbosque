// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { variablesConfig } from './src/lib/markdown-variables.ts';
import masquerTodo from './src/integrations/masquer-todo.ts';

export default defineConfig({
  site: 'https://padelbosque.fr',
  output: 'static',
  trailingSlash: 'never',
  // CSS intégré au HTML : un aller-retour bloquant de moins sur mobile.
  build: { format: 'file', inlineStylesheets: 'always' },
  // Polices servies depuis node_modules (Fontsource), sous-ensemble latin seulement
  // (couvre le français, Œ compris). Astro génère les @font-face, un repli aux
  // métriques ajustées (évite le saut de mise en page au chargement) et le preload.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Big Shoulders Display',
      cssVariable: '--f-display',
      // Repli calibré à la main dans global.css : le calcul automatique laisse le titre
      // du hero sur 2 lignes au lieu de 3, ce qui fait sauter la page au chargement.
      fallbacks: ['Big Shoulders repli', 'sans-serif'],
      optimizedFallbacks: false,
      options: {
        variants: [
          {
            src: ['@fontsource-variable/big-shoulders-display/files/big-shoulders-display-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Barlow',
      cssVariable: '--f-texte',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          { src: ['@fontsource/barlow/files/barlow-latin-400-normal.woff2'], weight: 400, style: 'normal' },
          { src: ['@fontsource/barlow/files/barlow-latin-600-normal.woff2'], weight: 600, style: 'normal' },
        ],
      },
    },
  ],
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
      filter: (page) => !['/bienvenue-fondateur', '/conditions-carte-fondateur', '/404'].some((p) => page.includes(p)),
    }),
  ],
});
