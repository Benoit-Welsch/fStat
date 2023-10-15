export function generateTable(data: Record<string, any[]>): string {
  const keys = Object.keys(data).sort((a, b) => data[a].length > data[b].length ? -1 : 1);

  const maxLengths = keys.map(key => {
    return Math.max(`${key} (${data[key].length})`.length, ...data[key].map(value => value !== undefined ? String(value).length : 0));
  });

  const header = keys.map((key, i) => {
    return `${key} (${data[key].length})`.padEnd(maxLengths[i]);
  }).join(' | ');

  const separator = keys.map((_, i) => '-'.repeat(maxLengths[i])).join('-+-');

  const rows = data[keys[0]].map((_, i) => keys.map((key, j) => {
    const value = data[key][i];
    if (value === undefined) {
      return ' '.repeat(maxLengths[j]);
    } else {
      return String(value).padEnd(maxLengths[j]);
    }
  }).join(' | '));
  
  return `${header.toUpperCase()}\n${separator}\n${rows.join('\n')}`;
}

