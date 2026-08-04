export const INPUT_BOUNDS = Object.freeze({
  sourceBytes: 512 * 1024,
  artifactBytes: 64 * 1024,
  retainedBytes: 512 * 1024 * 1024,
  remoteProbeMilliseconds: 10_000,
  requiredRemoteMilliseconds: 30_000,
  verdictMilliseconds: 60_000,
});

export const REMOTE_BLOCKED_CHECKS = Object.freeze([
  "configured-remote-reachability",
  "protected-base-freshness",
  "collaboration-fence-freshness",
]);
