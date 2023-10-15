type options = {
  total?: boolean;
  pourcentage?: boolean;
};

export function generateTable(data: Record<string, any[]>, options?: options): string {
  const keys = Object.keys(data).sort((a, b) => data[a].length > data[b].length ? -1 : 1)

  const totalData = keys.reduce((acc, key) => acc + data[key].length, 0);

  const makeHeader = (key: string) => {
    if (options && options.pourcentage) {
      return `${key} (${data[key].length} - ${((data[key].length / totalData) * 100).toFixed(2)}%)`;
    } else {
      return `${key} (${data[key].length})`;
    }
  }

  const maxLengths = keys.map(key => {
    return Math.max(makeHeader(key).length, ...data[key].map(value => value !== undefined ? String(value).length : 0));
  });

  const header = keys.map((key, i) => {
    return makeHeader(key).padEnd(maxLengths[i]);
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

