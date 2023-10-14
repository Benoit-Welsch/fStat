export function parseArgs(args: string[]): Record<string, string[]> {
  const options: Record<string, string[]> = { _raw: [], _noContext: [] };
  let currentOption: string | null = null;

  for (const arg of args) {
    if (arg.startsWith("--")) {
      currentOption = arg.slice(2);
      if (!options[currentOption]) {
        options[currentOption] = [];
      }
    } else if (currentOption !== null) {
      options[currentOption].push(arg);
    }
    else {
      options["_noContext"].push(arg);
    }
  }

  return { ...options, _raw: args };
}

