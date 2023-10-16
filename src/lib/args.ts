export function parseArgs(args: string[], short = true): Record<string, string[]> {
  const options: Record<string, string[]> = { _raw: [], _noContext: [] };
  let currentOption: string | null = null;

  for (const arg of args) {
    if (arg.startsWith("--") || (short && arg.startsWith("-"))) {
      currentOption = arg.startsWith("--") ? arg.slice(2) : arg.slice(1);
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

