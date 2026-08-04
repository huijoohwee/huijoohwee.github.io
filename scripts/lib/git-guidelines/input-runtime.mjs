import { execFileSync, spawnSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";

export function createInputRuntime(overrides = {}, verdictMilliseconds = 60_000) {
  const commandNow = overrides.commandNow || Date.now;
  return Object.freeze({
    git: overrides.git || defaultGit,
    now: overrides.now || Date.now,
    probeRemote: overrides.probeRemote || defaultRemoteProbe,
    readDirectory: overrides.readDirectory || readdirSync,
    readFile: overrides.readFile || readFileSync,
    stat: overrides.stat || statSync,
    commandNow,
    commandStartedAt: commandNow(),
    verdictMilliseconds,
  });
}

export function git(runtime, cwd, argumentsList, optional = false) {
  const elapsed = Math.max(0, runtime.commandNow() - runtime.commandStartedAt);
  const timeout = Math.max(1, runtime.verdictMilliseconds - elapsed);
  const result = runtime.git(cwd, argumentsList, optional, timeout);
  if (result.status === 0) return result.stdout;
  if (optional) return "";
  const error = new Error(result.stderr || `git ${argumentsList.join(" ")} failed with status ${result.status}.`);
  error.code = result.error?.code === "ETIMEDOUT" ? "ETIMEDOUT" : "EGIT";
  throw error;
}

function defaultGit(cwd, argumentsList, optional = false, timeout = 60_000) {
  try {
    return Object.freeze({
      status: 0,
      stdout: execFileSync("git", argumentsList, {
        cwd,
        encoding: "utf8",
        maxBuffer: 32 * 1024 * 1024,
        stdio: ["ignore", "pipe", "pipe"],
        timeout,
      }),
      stderr: "",
    });
  } catch (error) {
    const result = { status: error.status ?? 1, stdout: "", stderr: optional ? "" : String(error.stderr || error.message) };
    if (error.code === "ETIMEDOUT") result.error = Object.freeze({ code: error.code });
    return Object.freeze(result);
  }
}

function defaultRemoteProbe(repo, timeout) {
  return spawnSync("git", ["ls-remote", "--exit-code", "origin", "HEAD"], {
    cwd: repo,
    encoding: "utf8",
    timeout,
    stdio: ["ignore", "pipe", "pipe"],
  });
}
