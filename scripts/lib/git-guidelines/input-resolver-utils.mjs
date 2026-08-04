import { createHash } from "node:crypto";

export function readRequired(runtime, { file, inputId, kind, maximumBytes, problems, statuses, binary = false }) {
  try {
    const metadata = runtime.stat(file);
    if (!metadata.isFile()) throw fileError("EISDIR", "Input is not a regular file.");
    if (metadata.size > maximumBytes) throw fileError("EFBIG", `Input exceeds its ${maximumBytes}-byte bound.`);
    const bytes = runtime.readFile(file);
    if (bytes.length > maximumBytes) throw fileError("EFBIG", `Input exceeds its ${maximumBytes}-byte bound.`);
    statuses.set(inputId, "ok");
    return binary ? bytes : bytes.toString("utf8");
  } catch (error) {
    const condition = error?.code === "ENOENT" ? "absent" : "unreadable";
    recordProblem(problems, statuses, {
      code: `input-${condition}`,
      condition,
      inputId,
      kind,
      path: file,
      message: error.message,
    });
    return null;
  }
}

export function recordProblem(problems, statuses, problem) {
  statuses.set(problem.inputId, problem.condition);
  if (problems.some(existing => existing.inputId === problem.inputId && existing.condition === problem.condition)) return;
  problems.push(Object.freeze(problem));
}

export function byteCompare(left, right) {
  return Buffer.from(String(left)).compare(Buffer.from(String(right)));
}

export function digestText(value) {
  return createHash("sha256").update(String(value), "utf8").digest("hex");
}

export function deepFreeze(value) {
  if (!value || typeof value !== "object" || ArrayBuffer.isView(value) || Object.isFrozen(value)) return value;
  for (const child of Object.values(value)) deepFreeze(child);
  return Object.freeze(value);
}

export function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function fileError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}
