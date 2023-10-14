import { categoryOfFile } from './stats';
import { describe, it, expect, } from 'bun:test';

describe('classifyFile', () => {
  const testCases = [
    ['example.jpg', 'image'],
    ['example.mp4', 'video'],
    ['example.mp3', 'audio'],
    ['example.pdf', 'document'],
    ['example.zip', 'archive'],
    ['example.ts', 'code'],
    ['example.exe', 'executable'],
    ['example.ttf', 'font'],
    ['example.xyz', null],
  ];

  testCases.forEach(([fileName, expectedType]) => {
    if (fileName !== null) {
      it(`should return "${expectedType}" for a file with a ${fileName.split('.').pop()} extension`, () => {
        expect(categoryOfFile(fileName)).toBe(expectedType);
      });

    }
    else {
      throw new Error('fileName is null');
    }
  });
});
