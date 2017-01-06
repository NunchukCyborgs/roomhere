export function loadScript(url, callback = (...params: any[]) => { console.log(`Done loading ${url}`) }): void {
  let scriptIndex = Array.prototype.slice
    .call(document.head.getElementsByTagName('script'))
    .map(i => i.src)
    .indexOf(url)

  if (scriptIndex === -1) {
    var d = document, t = 'script',
      o = d.createElement(t),
      s = d.getElementsByTagName(t)[0];
    o['src'] = url;
    if (callback) { o.addEventListener('load', function (e) { callback(null, e); }, false); }
    s.parentNode.insertBefore(o, s);
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