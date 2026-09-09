import { execSync } from "node:child_process";

/** `owner/repo` for the two remote forms git actually writes, plus `ssh://`. */
const GITHUB_REMOTE =
  /^(?:git@github\.com:|(?:https?|ssh):\/\/(?:[^@/]+@)?github\.com\/)([^/]+\/[^/]+?)(?:\.git)?\/?$/;

/**
 * Which GitHub repo this site belongs to, worked out at build time rather than
 * hard-coded, so that renaming it or transferring it to another owner needs no
 * edits here.
 *
 * On GitHub Actions `GITHUB_REPOSITORY` is always set; locally we fall back to
 * the `origin` remote. Undefined if neither is available (no git, no remote, or
 * a non-GitHub host), in which case the GitHub links are omitted rather than
 * pointed somewhere wrong.
 */
export const repoSlug: string | undefined = (() => {
  if (process.env.GITHUB_REPOSITORY) return process.env.GITHUB_REPOSITORY;
  try {
    const url = execSync("git config --get remote.origin.url", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"], // git's own stderr is not interesting
    }).trim();
    return url.match(GITHUB_REMOTE)?.[1];
  } catch {
    return undefined;
  }
})();

/**
 * Site base path, with the trailing slash VitePress requires.
 *
 * The workflow passes `DEPLOY_BASE` from the `configure-pages` action, which
 * reports `/<repo>` for a project site and `""` for a user site or a custom
 * domain — neither has the trailing slash, and the empty case must become "/".
 */
export const deployBase: string = (() => {
  const raw = process.env.DEPLOY_BASE?.trim();
  if (!raw) return "/";
  return raw.endsWith("/") ? raw : `${raw}/`;
})();
