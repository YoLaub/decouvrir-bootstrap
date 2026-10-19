import { describe, it, expect } from "vitest";
import { carouselExample, SLIDES } from "./carousel";

const html = carouselExample("/base/");
const count = (re: RegExp) => (html.match(re) ?? []).length;

describe("carouselExample", () => {
  it("has three slides and exactly one of them is active", () => {
    expect(SLIDES).toHaveLength(3);
    expect(count(/class="carousel-item/g)).toBe(3);
    expect(count(/class="carousel-item active"/g)).toBe(1);
  });

  it("gives the carousel an id that every data-bs-target points to", () => {
    const id = /<div id="([^"]+)" class="carousel slide"/.exec(html)?.[1];
    expect(id).toBeTruthy();
    const targets = [...html.matchAll(/data-bs-target="([^"]+)"/g)].map((m) => m[1]);
    expect(targets.length).toBeGreaterThanOrEqual(5);
    expect(new Set(targets)).toEqual(new Set([`#${id}`]));
  });

  it("has previous and next arrows and one indicator per slide", () => {
    expect(html).toContain('data-bs-slide="prev"');
    expect(html).toContain('data-bs-slide="next"');
    expect(count(/data-bs-slide-to="\d"/g)).toBe(3);
    expect(html).toContain('data-bs-slide-to="0" class="active"');
  });

  it("makes every image fill the width and gives it a text alternative", () => {
    const imgs = html.match(/<img [^>]+>/g) ?? [];
    expect(imgs).toHaveLength(3);
    for (const img of imgs) {
      expect(img).toContain('class="d-block w-100"');
      expect(img).toMatch(/alt="[^"]+"/);
    }
  });

  it("loads the images from the given base path", () => {
    expect(html).toContain('src="/base/img/plaine.svg"');
  });

  it("hides the arrows' labels from sighted users but keeps them for screen readers", () => {
    expect(count(/visually-hidden/g)).toBe(2);
  });
});
