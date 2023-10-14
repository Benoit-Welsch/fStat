import { FileDetail } from "./reader";

const categories = {
  image: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'ico'],
  video: ['mp4', 'mkv', 'avi', 'webm'],
  audio: ['mp3', 'wav', 'ogg', 'aac'],
  document: ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'csv', 'pdf', 'txt', 'template', 'license', 'mit', 'notice', 'privacy'],
  archive: ['zip', 'rar', 'tar', 'gz', '7z'],
  markdown: ['md', 'markdown', 'mdown', 'mkdn', 'mkd', 'mdwn', 'mdtxt', 'mdtext', 'text'],
  config: ['env', 'env.local', 'conf', 'config', 'cfg', 'ini', 'gitignore', 'gitconfig', 'eslintignore'],
  log: ["log"],
  container: ['dockerfile', 'dockerignore', 'docker-compose.yml', 'docker-compose.yaml', 'docker-compose.json', 'docker-compose.json',],
  code: ['html', 'css', 'js', 'ts', 'jsx', 'tsx', 'json', 'py', 'java', 'c', 'cpp', 'h', 'hpp', 'cs', 'go', 'php', 'rb', 'rs', 'swift', 'vb', 'xml', 'yml', 'yaml', 'sql', 'pl', 'm', 'mjs', 'jsx', 'tsx', 'cjs', 'asm', 'psm1', 'psd1', 'psc1', 'pssc', 'cdxml', 'xaml', 'xaml', 'wsf', 'psc2', 'reg', 'rgs', 'inf', 'ins', 'isp', 'wsc', 'wsh', 'cer', 'crt', 'der', 'pfx', 'p12', 'p7b', 'p7r', 'spc', 'gpg', 'asc', 'jks', 'keystore', 'crtx', 'key', 'pem', 'csr', 'p7c', 'p7m', 'p7s', 'p8', 'p10', 'pki', 'p7', 'p7a', 'p7d', 'p7f', 'p7w', 'p7z', 'p8', 'p8e', 'p8s', 'p8r', 'p8m', 'p8d', 'p8f', 'p8w', 'p8z', 'p8a', 'p8b', 'p8c', 'p8x', 'p8y', 'p8t', 'p8q', 'p8i', 'p8j', 'p8k', 'p8l', 'p8n', 'p8o', 'p8p', 'p8u', 'p8v', 'p8w', 'p8x', 'p8y', 'p8z', 'p8a', 'p8b', 'p8c', 'p8d', 'p8e', 'p8f', 'p8g', 'p8h', 'p8i', 'p8j', 'p8k', 'p8l', 'p8m', 'p8n', 'p8o', 'p8p', 'lockb', 'node', 'map', 'wasm', 'makefile'],
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



