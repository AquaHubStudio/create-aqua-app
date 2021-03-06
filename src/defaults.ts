import path from "path";
import { fileURLToPath } from "url";

// Root directory path
const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export const DEFAULT_APP_NAME = 'my-aqua-app';