/** The three slides of the course carousel: image file name, alt text. */
export const SLIDES = [
  { file: "plaine", alt: "La plaine" },
  { file: "foret", alt: "La forêt" },
  { file: "village", alt: "Le village" },
] as const;

const ID = "carrousel";

/** HTML of the carousel example shown in the course; `base` is the site base path ending with a slash. */
export function carouselExample(base: string): string {
  const indicators = SLIDES.map(
    (s, i) =>
      `      <button type="button" data-bs-target="#${ID}" data-bs-slide-to="${i}"${i === 0 ? ' class="active" aria-current="true"' : ""} aria-label="Diapositive ${i + 1}"></button>`,
  ).join("\n");
  const items = SLIDES.map(
    (s, i) => `      <div class="carousel-item${i === 0 ? " active" : ""}">
        <img src="${base}img/${s.file}.svg" class="d-block w-100" alt="${s.alt}">
      </div>`,
  ).join("\n");
  const arrow = (dir: "prev" | "next", label: string) => `    <button class="carousel-control-${dir}" type="button" data-bs-target="#${ID}" data-bs-slide="${dir}">
      <span class="carousel-control-${dir}-icon" aria-hidden="true"></span>
      <span class="visually-hidden">${label}</span>
    </button>`;
  return `<div class="container py-3">
  <div id="${ID}" class="carousel slide">
    <div class="carousel-indicators">
${indicators}
    </div>
    <div class="carousel-inner">
${items}
    </div>
${arrow("prev", "Précédent")}
${arrow("next", "Suivant")}
  </div>
</div>
`;
}
