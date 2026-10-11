import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const pagesFaq = ['accueil', 'entreprise', 'stages', 'tournois', 'acces'] as const;
export const contextesWhatsApp = ['fondateur', 'entreprise', 'stage', 'tournoi', 'general'] as const;
export const blocs = ['acces', 'tarifs', 'horaires', 'equipements'] as const;

/** Pages éditables. type "seo" : générée par [slug].astro. type "systeme" : page dédiée. */
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    type: z.enum(['seo', 'systeme']),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    requete: z.string().optional(),
    noindex: z.boolean().default(false),
    contexteWhatsApp: z.enum(contextesWhatsApp).default('general'),
    faq: z.enum(pagesFaq).optional(),
    blocs: z.array(z.enum(blocs)).default([]),
    ordre: z.number().default(0),
    libelleLien: z.string().optional(),
  }),
});

/** Textes des sections de l'accueil. */
const accueil = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/accueil' }),
  schema: z.object({
    titre: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    sousTitre: z.string().optional(),
  }),
});

/** Une question par fichier. La réponse est le corps du fichier. */
const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    page: z.enum(pagesFaq),
    ordre: z.number(),
  }),
});

export const collections = { pages, accueil, faq };
