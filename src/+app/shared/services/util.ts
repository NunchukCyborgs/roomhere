export function loadScript(url): void {
  let scriptIndex = Array.prototype.slice
    .call(document.head.getElementsByTagName('script'))
    .map(i => i.src)
    .indexOf(url)

  if (scriptIndex === -1) {
    let script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}

export function generateGUID(): string {
  return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4)
}

const names = [
  'Anonymous Alligator',
  'Anonymous Ape',
  'Anonymous Aardvark',
  'Anonymous Anteater',
  'Anonymous Armadillo',
  'Private Parrot',
  'Private Peacock',
  'Private Poodle',
  'Private Pug',
  'Private Platypus',
  'Private Porpoise',
  'Unknown Unicorn',
  // Any more?
];

export function generateAnonymousName(): string {
  return names[Math.floor(Math.random() * (names.length))];
}