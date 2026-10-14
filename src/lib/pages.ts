export interface Page { slug: string; title: string }

export const pages: Page[] = [
  { slug: "installation", title: "Brancher Bootstrap" },
  { slug: "grille", title: "La grille" },
  { slug: "utilitaires", title: "Classes utilitaires" },
  { slug: "composants", title: "Composants" },
  { slug: "personnaliser", title: "Personnaliser" },
  { slug: "evaluation", title: "Teste tes acquis" },
  { slug: "aller-plus-loin", title: "Aller plus loin" },
];

export function neighbors(slug: string): { prev?: Page; next?: Page } {
  const i = pages.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return { prev: pages[i - 1], next: pages[i + 1] };
}
