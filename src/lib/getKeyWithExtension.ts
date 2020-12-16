const extensions = {
  bat: 'bat',
  clojure: 'cj',
  coffee: 'coffee',
  c: 'c',
  cpp: 'cpp',
  csharp: 'cs',
  css: 'css',
  dockerfile: 'Dockerfile',
  fsharp: 'fs',
  go: 'go',
  graphql: 'graphql',
  handlebars: 'hbs',
  html: 'html',
  ini: 'ini',
  java: 'java',
  javascript: 'js',
  kotlin: 'kt',
  less: 'less',
  lua: 'lua',
  markdown: 'md',
  mysql: 'mysql',
  'objective-c': 'm',
  pascal: 'pascal',
  perl: 'perl',
  pgsql: 'pgsql',
  php: 'php',
  powershell: 'ps',
  pug: 'pug',
  python: 'py',
  r: 'r',
  restructuredtext: 'rst',
  ruby: 'rb',
  rust: 'rs',
  scss: 'scss',
  shell: 'sh',
  sql: 'sql',
  swift: 'swift',
  twig: 'twig',
  typescript: 'ts',
  tsc: 'tsc',
  vb: 'vb',
  xml: 'xml',
  yaml: 'yaml'
};

const getKeyWithExtension = (key: string, languageId: string): string => {
  const extension = (extensions as any)[languageId];

  if (!extension) {
    return key;
  }

  return `${key}.${extension}`;
};

export default getKeyWithExtension;
