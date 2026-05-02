const COMMAND_SUGGESTIONS: Record<string, string> = {
  "\\frak": "\\mathfrak",
  "\\bold": "\\mathbf",
  "\\real": "\\mathbb{R}",
  "\\Z": "\\mathbb{Z}",
  "\\N": "\\mathbb{N}",
  "\\inf": "\\infty",
  "\\deg": "\\degree",
  "\\Cross": "\\times",
  "\\del": "\\partial",
};

export function suggestCommand(cmd: string): string {
  if (COMMAND_SUGGESTIONS[cmd]) return `\`${COMMAND_SUGGESTIONS[cmd]}\``;
  // Try to find similar command
  const lower = cmd.toLowerCase();
  for (const [wrong, right] of Object.entries(COMMAND_SUGGESTIONS)) {
    if (lower.includes(wrong.replace("\\", ""))) return `\`${right}\``;
  }
  return "a valid LaTeX command";
}

export function getFriendlyError(rawError: string, input: string): string {
  if (rawError.includes("Undefined control sequence")) {
    const match = input.match(/\\[a-zA-Z]+/g);
    const badCmd = match ? match[match.length - 1] : "that command";
    return `The command \`${badCmd}\` doesn't exist in KaTeX. Did you mean ${suggestCommand(badCmd)}?`;
  }
  if (rawError.includes("Missing $ inserted") || rawError.includes("math mode")) {
    return "Math symbols need to be inside dollar signs. Try wrapping with $...$";
  }
  if (rawError.includes("Extra }") || rawError.includes("forgotten $")) {
    return "There's an extra } brace — check your braces are balanced.";
  }
  if (rawError.includes("Misplaced &")) {
    return "& is used for alignment inside environments like align or tabular.";
  }
  if (rawError.includes("Expected 'EOF'")) {
    return "Unexpected character — make sure all special characters are escaped (e.g. \\$ \\% \\&).";
  }
  if (rawError.includes("Unknown column alignment")) {
    return "In tabular, columns are specified as l (left), c (center), or r (right).";
  }
  if (rawError.includes("No such file or directory")) {
    return "That package isn't available in KaTeX. Try a different approach.";
  }
  return `Syntax error: ${rawError.split("\n")[0]}`;
}
