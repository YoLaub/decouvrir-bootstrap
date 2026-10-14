// Self-host Bootstrap so the course works on a network that blocks CDNs.
import { mkdirSync, copyFileSync } from "node:fs";

mkdirSync("public/vendor", { recursive: true });
copyFileSync("node_modules/bootstrap/dist/css/bootstrap.min.css", "public/vendor/bootstrap.min.css");
copyFileSync("node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", "public/vendor/bootstrap.bundle.min.js");
