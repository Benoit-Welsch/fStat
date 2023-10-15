import { FileDetail } from "./reader";

const categories = {
  image: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'ico'],
  video: ['mp4', 'mkv', 'avi', 'webm'],
  audio: ['mp3', 'wav', 'ogg', 'aac'],
  document: ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'csv', 'pdf', 'txt', 'template', 'license', 'mit', 'notice', 'privacy'],
  archive: ['zip', 'rar', 'tar', 'gz', '7z'],
  markdown: ['md', 'markdown'],
  config: ['env', 'env.local', 'conf', 'config', 'cfg', 'ini', 'gitignore', 'gitconfig', 'eslintignore'],
  log: ["log"],
  container: ['dockerfile', 'dockerignore', 'docker-compose.yml', 'docker-compose.yaml', 'docker-compose.json', 'docker-compose.json',],
  code: ['html', 'css', 'js', 'ts', 'jsx', 'tsx', 'json', 'py', 'java', 'c', 'cpp', 'h', 'hpp', 'cs', 'go', 'php', 'rb', 'rs', 'swift', 'vb', 'xml', 'yml', 'yaml', 'sql', 'pl', 'm', 'mjs', 'jsx', 'tsx', 'cjs', 'asm', 'psm1', 'psd1', 'psc1', 'xaml', 'xaml', 'wsf', 'reg', 'lockb', 'node', 'map', 'wasm', 'makefile'],
  executable: ['exe', 'msi', "sh", "bat", "cmd", "ps1", "zsh", 'bin'],
  font: ['ttf', 'otf', 'woff', 'woff2'],

};


export function categoryOfFile(fileName: string): string | null {
  const extension = fileName.split('.').pop()?.toLowerCase();
  if (!extension) {
    return null;
  }
  for (const [fileType, extensions] of Object.entries(categories)) {
    if (extensions.includes(extension.toLocaleLowerCase())) {
      return fileType;
    }
  }
  return null;
}
export function classifyFile(files: FileDetail[] | string[]) {
  const classifiedFiles: Record<string, (FileDetail | string)[]> = {};
  files.forEach(file => {
    const name = typeof file === "string" ? file : file.name;
    let category = categoryOfFile(name);
    if (!category) category = "unknown";
    if (!classifiedFiles[category]) {
      classifiedFiles[category] = [];
    }
    classifiedFiles[category].push(file);
  });
  return classifiedFiles
}

export function filterClassification(categories: Record<string, (string | FileDetail)[]>, excludes: string[]) {
  const filteredCategories: Record<string, (FileDetail | string)[]> = {};
  for (const [category, files] of Object.entries(categories)) {
    if (excludes.includes(category)) continue;
    filteredCategories[category] = files;
  }
  return filteredCategories;
}


