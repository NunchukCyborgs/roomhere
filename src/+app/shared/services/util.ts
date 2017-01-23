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

export function formatObjCurl(facets: Object, prefix = ''): string {
  let formatted = '';

  for (let propertyName in facets) {
    if (facets.hasOwnProperty(propertyName)) {
      if (Array.isArray(facets[propertyName])) {
        formatted += facets[propertyName].map(i => formatObjCurl(i, `${prefix}[${propertyName}][]`)).join('');
      } else if (typeof facets[propertyName] === 'object') {
        formatted += formatObjCurl(facets[propertyName], `${prefix}[${propertyName}]`);
      } else {
        formatted += `&${prefix}[${propertyName}]=${facets[propertyName]}`;
      }
    }
  }

  return formatted;
}

export function createUrlParam(key: string | number, value: string | number, unsafeChars: RegExp = /[ ]/ig): string {
  return `${key}=${value};`.replace(unsafeChars, '_');
}

export function createUrlRangeParam(key: string | number, values: [string | number, string | number], unsafeChars: RegExp = /[ ]/ig): string {
  return `${key}=${values[0]}-${values[1]};`.replace(unsafeChars, '_');
}

export function createUrlListParam(key: string | number, values: Array<string | number>, delimitter: string = '.', unsafeChars: RegExp = /[ ]/ig): string {
  return `${key}=${values.join(delimitter)};`.replace(unsafeChars, '_');
}

export function parseUrlRange(queryString: string): [number, number] {
  let min = parseInt(queryString, 10);

  return [
    min, // Relying on parseInts parsing of alphanumerics
    parseInt(queryString.substring(min.toString().length + 1), 10),
  ]
}

export function parseUrlList(queryString: string, delimitter = '.'): string[] {
  return queryString.replace(/[_]/gi, ' ').split(delimitter);
}