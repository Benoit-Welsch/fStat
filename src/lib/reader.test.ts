import { readFilesSync } from './reader';
import { describe, it, expect } from 'bun:test';

describe('readFilesSync', () => {
  it('should return an array of file details', () => {
    const dirPath = './';
    const files = readFilesSync(dirPath, false, true);
    expect(Array.isArray(files)).toBe(true);
    expect(files.every((file) => typeof file === 'object')).toBe(true);
    expect(files.every((file) => typeof file.name === 'string')).toBe(true);
    expect(files.every((file) => typeof file.path === 'string')).toBe(true);
    expect(files.every((file) => typeof file.size === 'number')).toBe(true);
    expect(files.every((file) => file.createdAt instanceof Date)).toBe(true);
    expect(files.every((file) => file.modifiedAt instanceof Date)).toBe(true);
  });

  it('should throw an error if directory does not exist', () => {
    const dirPath = '/path/to/non-existent/directory';
    expect(() => readFilesSync(dirPath)).toThrow('Directory does not exist');
  });

  it('should throw an error if directory path is not provided', () => {
    //@ts-expect-error - intentionally not passing a directory path
    expect(() => readFilesSync()).toThrow('Directory does not exist');
  });
});
