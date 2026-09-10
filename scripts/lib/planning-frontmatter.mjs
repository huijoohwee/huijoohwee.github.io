// Planning adapter for the existing shared metadata parser; no second YAML parser.
import { readFrontmatter } from './git-guidelines/fm-reader.mjs';

export function scanFrontmatter(text, requiredKeysOrOptions = []) {
  try {
    const parsed = readFrontmatter(text);
    const required = Array.isArray(requiredKeysOrOptions) ? requiredKeysOrOptions
      : requiredKeysOrOptions.requiredKeys ?? [];
    return { readState: 'ok', error: null, frontmatter: parsed.data,
      body: text.replace(/\r\n?/gu, '\n').split('\n').slice(parsed.endLine).join('\n'),
      missingKeys: required.filter(key => parsed.data[key] === undefined || parsed.data[key] === '') };
  } catch (error) { return { readState: 'malformed', error: error.message, frontmatter: {}, body: '', missingKeys: [] }; }
}
export const frontmatterObject = value => value instanceof Map ? Object.fromEntries(value) : value;
