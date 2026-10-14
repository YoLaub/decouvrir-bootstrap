import { describe, it, expect } from "vitest";
import { buildPreviewDoc } from "./preview";

const opts = { assetBase: "/decouvrir-bootstrap/vendor/" };

describe("buildPreviewDoc", () => {
  it("embeds the learner HTML in the body", () => {
    const doc = buildPreviewDoc('<button class="btn">Go</button>', opts);
    expect(doc).toContain('<button class="btn">Go</button>');
  });

  it("loads Bootstrap CSS from the self-hosted vendor folder", () => {
    const doc = buildPreviewDoc("<p>x</p>", opts);
    expect(doc).toContain('href="/decouvrir-bootstrap/vendor/bootstrap.min.css"');
  });

  it("loads the bundle (Popper included) at the end of the body", () => {
    const doc = buildPreviewDoc("<p>x</p>", opts);
    const script = doc.indexOf("bootstrap.bundle.min.js");
    expect(script).toBeGreaterThan(doc.indexOf("<p>x</p>"));
    expect(script).toBeLessThan(doc.indexOf("</body>"));
  });

  it("puts the learner CSS after Bootstrap so it wins the cascade", () => {
    const doc = buildPreviewDoc("<p>x</p>", { ...opts, css: ":root{--bs-border-radius:0}" });
    expect(doc.indexOf(":root{--bs-border-radius:0}")).toBeGreaterThan(doc.indexOf("bootstrap.min.css"));
  });

  it("adds a viewport meta so breakpoints follow the frame width", () => {
    expect(buildPreviewDoc("", opts)).toContain('name="viewport"');
  });

  it("does not load the bundle when the learner asks for CSS only", () => {
    expect(buildPreviewDoc("", { ...opts, js: false })).not.toContain("bootstrap.bundle.min.js");
  });
});

describe("buildPreviewDoc raw mode", () => {
  it("returns the learner document untouched so they wire Bootstrap themselves", () => {
    const html = "<!doctype html><html><head></head><body><p>x</p></body></html>";
    expect(buildPreviewDoc(html, { assetBase: "/v/", raw: true })).toBe(html);
  });
});
