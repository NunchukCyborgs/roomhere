import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  constructor() { }

  public loadScript(url): void {
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

  public generateGUID(): string {
    return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4)
  }
}

 export function generateGUID(): string {
    return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4)
  }
// todo fix
