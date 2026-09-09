import { execSync } from "node:child_process";

/**
 * Where this site lives, worked out at build time rather than hard-coded, so
 * that renaming the repo or transferring it to another owner needs no edits.
 *
 * On GitHub Actions `GITHUB_REPOSITORY` is always set; locally we read the git
 * remote instead.
 */
export const repoSlug: string | undefined = (() => {
  if (process.env.GITHUB_REPOSITORY) return process.env.GITHUB_REPOSITORY;
  try {
    const url = execSync("git config --get remote.origin.url", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return url.match(/github\.com[:/](.+?)(?:\.git)?\/?$/)?.[1];
  } catch {
    return undefined; // no git, no remote: links are simply omitted
  }
})();

/**
 * Site base path, with the trailing slash VitePress requires. The workflow
 * passes `DEPLOY_BASE` from the Pages configuration, which is `/` for a custom
 * domain and `/<repo>/` for a project site.
 */
export const deployBase: string = (() => {
  const raw = process.env.DEPLOY_BASE?.trim();
  if (!raw) return "/";
  return raw.endsWith("/") ? raw : `${raw}/`;
})();
