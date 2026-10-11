import { club, liens, type ContexteWhatsApp } from '../config';

const messages: Record<ContexteWhatsApp, string> = {
  fondateur: `Bonjour, je souhaite devenir membre fondateur de ${club.nom}. Pouvez-vous m'en dire plus ?`,
  entreprise: `Bonjour, je souhaite organiser un événement d'entreprise chez ${club.nom}. Pouvez-vous me recontacter ?`,
  stage: `Bonjour, je souhaite être informé des stages de padel enfants chez ${club.nom}.`,
  tournoi: `Bonjour, je souhaite être informé des tournois et des ligues chez ${club.nom}.`,
  general: `Bonjour, j'ai une question sur ${club.nom}.`,
};

export const libellesWhatsApp: Record<ContexteWhatsApp, string> = {
  fondateur: 'Une question ? Écrivez-nous sur WhatsApp',
  entreprise: 'Parlons de votre événement sur WhatsApp',
  stage: 'Être prévenu des stages sur WhatsApp',
  tournoi: 'Être prévenu des tournois sur WhatsApp',
  general: 'Nous écrire sur WhatsApp',
};

/** Lien wa.me avec un message prérempli adapté au contexte. */
export function lienWhatsApp(contexte: ContexteWhatsApp = 'general'): string {
  return `https://wa.me/${liens.whatsappNumero}?text=${encodeURIComponent(messages[contexte])}`;
}
