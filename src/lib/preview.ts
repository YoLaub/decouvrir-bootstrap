export interface PreviewOptions {
  /** Absolute URL prefix where bootstrap.min.css and the bundle are served. */
  assetBase: string;
  /** Learner CSS, injected after Bootstrap so it wins the cascade. */
  css?: string;
  /** Load the JS bundle (Popper included). Defaults to true. */
  js?: boolean;
  /** The learner writes the whole document and wires Bootstrap themselves. */
  raw?: boolean;
}

export function buildPreviewDoc(html: string, { assetBase, css = "", js = true, raw = false }: PreviewOptions): string {
  if (raw) return html;
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="${assetBase}bootstrap.min.css" rel="stylesheet">
<style>${css}</style>
</head>
<body>
${html}
${js ? `<script src="${assetBase}bootstrap.bundle.min.js"></script>` : ""}
</body>
</html>`;
}
