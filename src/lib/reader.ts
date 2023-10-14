import fs from 'fs';
import path from 'path';

interface FileDetail {
  name: string;
  path: string;
  size: number;
  createdAt: Date;
  modifiedAt: Date;
}

export function isDirectory(dirPath: string): boolean {
  return fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();
}

// Damn, TypeScript is smart!
export function readFilesSync(dirPath: string, recursive?: boolean, getFileDetail?: false) : string[];
export function readFilesSync(dirPath: string, recursive?: boolean, getFileDetail?: true) : FileDetail[];
export function readFilesSync(dirPath: string, recursive = false, getFileDetail = false) {
  if (!isDirectory(dirPath)) throw new Error('Directory does not exist');
  const files: string[] = [];
  const fileDetails: FileDetail[] = [];

  const readDir = (dirPath: string) => {
    const fileList = fs.readdirSync(dirPath);

    fileList.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory() && recursive) {
        readDir(filePath);
      } else {
        files.push(filePath);

        if (getFileDetail) {
          const fileDetail: FileDetail = {
            name: file,
            path: filePath,
            size: stats.size,
            createdAt: stats.birthtime,
            modifiedAt: stats.mtime,
          };
          fileDetails.push(fileDetail);
        }
      }
    });
  };

  readDir(dirPath);

  return getFileDetail ? fileDetails : files;
}
