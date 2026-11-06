import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { club } from '../../config';
import { remplir } from '../../lib/gabarit';
import { imagePartage, offreCarte } from '../../lib/image-partage';

export const getStaticPaths = (async () => {
  const pages = await getCollection('pages', (p) => p.data.type === 'seo');
  return [
    { params: { image: 'accueil' }, props: { titre: club.promesse, accroche: offreCarte() } },
    ...pages.map((p) => ({
      params: { image: p.data.slug },
      props: { titre: remplir(p.data.libelleLien ?? p.data.h1), accroche: undefined },
    })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await imagePartage(props.titre, props.accroche)), {
    headers: { 'Content-Type': 'image/png' },
  });
