import path from "node:path";

import { collectRegistrationPathReferences } from "./registration.mjs";

const DELIVERED_DOCUMENT_PATH = "docs/documents/git-guidelines.md";

export function resolveRegistrationInventory(runtime, registrations, {
  repositoryRoot,
  registrationRoot,
  workspaceRoot,
  statuses,
}) {
  const references = collectRegistrationPathReferences(registrations);
  return Object.freeze(references.map(reference => {
    const candidates = registrationCandidates(reference, { repositoryRoot, registrationRoot, workspaceRoot });
    let resolvedPath = candidates[0] || "";
    let exists = false;
    for (const candidate of candidates) {
      try {
        if (!runtime.stat(candidate).isFile()) continue;
        resolvedPath = candidate;
        exists = true;
        break;
      } catch {
        // Each candidate is probed once; another allowed root may own the reference.
      }
    }
    statuses.set(`registration-path:${reference.artifact}:${reference.base}:${reference.path}`, exists ? "ok" : "absent");
    return Object.freeze({ ...reference, resolvedPath, exists });
  }));
}

function registrationCandidates(reference, { repositoryRoot, registrationRoot, workspaceRoot }) {
  if (reference.base === "artifact") {
    const candidate = path.resolve(registrationRoot, path.dirname(reference.artifact), reference.path);
    return isWithinRoot(candidate, registrationRoot) ? [candidate] : [];
  }
  if (reference.path === DELIVERED_DOCUMENT_PATH) {
    const deliveredRepositoryRoot = path.resolve(repositoryRoot);
    const candidate = path.resolve(deliveredRepositoryRoot, reference.path);
    return isWithinRoot(candidate, deliveredRepositoryRoot) ? [candidate] : [];
  }
  const roots = [...new Set([
    repositoryRoot,
    registrationRoot,
    path.join(registrationRoot, path.dirname(reference.artifact)),
    workspaceRoot,
  ].map(value => path.resolve(value)))];
  return roots.map(root => path.resolve(root, reference.path)).filter((candidate, index) => (
    isWithinRoot(candidate, roots[index])
  ));
}

function isWithinRoot(candidate, root) {
  const relative = path.relative(path.resolve(root), path.resolve(candidate));
  return relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}
