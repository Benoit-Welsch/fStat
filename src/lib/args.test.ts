import { parseArgs } from './args';
import { describe, it, expect } from 'bun:test';

describe('parseArgs', () => {
  const base = { _raw: [], _noContext: [] }

  it('should return an empty object when passed an empty array', () => {
    expect(parseArgs([])).toEqual({ ...base });
  });

  it('should return an object with key-value pairs for each argument', () => {
    const args = ['--name', 'John', '--age', '30'];
    const expected = { name: ['John'], age: ['30'] };
    expect(parseArgs(args)).toEqual({ ...expected, _raw: args, _noContext: [] });
  });

  it('should handle short arguments', () => {
    const args = ['-n', 'John', '-a', '30'];
    const expected = { n: ['John'], a: ['30'] };
    expect(parseArgs(args, true)).toEqual({ ...expected, _raw: args, _noContext: [] });
  });

  it('should handle arguments with no value', () => {
    const args = ['--verbose', '--debug'];
    const expected = { verbose: [], debug: [] };
    expect(parseArgs(args)).toEqual({ ...expected, _raw: args, _noContext: [] });
  });

  it('should handle arguments with multiple values', () => {
    const args = ['--name', 'John', '--name', 'Doe'];
    const expected = { name: ['John', 'Doe'] };
    expect(parseArgs(args)).toEqual({ ...expected, _raw: args, _noContext: [] });
  });

  it('should handle arguments with spaces in the value', () => {
    const args = ['--name', 'John Doe'];
    const expected = { name: ['John Doe'] };
    expect(parseArgs(args)).toEqual({ ...expected, _raw: args, _noContext: [] });
  });

  it('should handle multiple arguments with spaces in the value', () => {
    const args = ['--name', 'John', 'Doe'];
    const expected = { name: ['John', 'Doe'] };
    expect(parseArgs(args)).toEqual({ ...expected, _raw: args, _noContext: [] });
  });

  it('should handle arguments with no context', () => {
    const args = ['Doe', '--name', 'John',];
    const expected = { name: ['John'], _noContext: ['Doe'] };
    expect(parseArgs(args)).toEqual({ ...expected, _raw: args, _noContext: ['Doe'] });
  });
});
