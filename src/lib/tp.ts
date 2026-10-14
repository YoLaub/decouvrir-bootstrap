export interface TpPage { slug: string; title: string }

const titles: Record<string, string> = {
  "manche-0": "Manche 0 · Chasse dans la doc",
  "manche-1": "Manche 1 · Le squelette",
  "manche-2": "Manche 2 · L'habillage",
  "manche-3": "Manche 3 · Le carton de crise",
  "jeu-des-erreurs": "Jeu des erreurs",
};

/** Rounds linked one after the other with previous/next buttons. */
export const tpSequence = ["manche-0", "manche-1", "manche-2"];

/** Rounds the trainer releases by sharing the link, so nobody reads them early. */
export const tpOnDemand = ["manche-3", "jeu-des-erreurs"];

export function tpTitle(slug: string): string {
  return titles[slug];
}

export function tpNeighbors(slug: string): { prev?: TpPage; next?: TpPage } {
  const i = tpSequence.indexOf(slug);
  if (i === -1) return {};
  const page = (s?: string) => (s ? { slug: s, title: tpTitle(s) } : undefined);
  return { prev: page(tpSequence[i - 1]), next: page(tpSequence[i + 1]) };
}
