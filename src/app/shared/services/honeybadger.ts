import { isBrowser } from 'angular2-universal'; 
declare let Honeybadger: any;

export interface Config {
  api_key: string;
  host?: string;
  ssl?: boolean;
  project_root?: string;
  environment?: string;
  component?: string;
  action?: string;
  onerror?: boolean;
  disabled?: boolean;
}

export interface Notice {
  stack: any;
  name: string;
  message: string;
  url: string;
  project_root: string;
  environment: string;
  component: string;
  action: string;
  fingerprint: string;
  context: any;
}

export interface Honey {
  configure(config: Config): void;
  notify(...args: any[]): void;
  wrap<T extends Function>(func: T): T;
  setContext<T extends Object>(context: T): void;
  resetContext(): void;
  beforeNotify(func: (notice?: Notice) => void): void;
  factory(config: Config): Honey;
}

export function getHoneybadger(useLocalhost = false): Honey {
  return (isBrowser && (useLocalhost || window.location.hostname !== 'localhost')) ? Honeybadger : getEmptyHoneybadger();
}

function getEmptyHoneybadger(): Honey {
  return {
    configure: function(config: Config) { return undefined },
    notify: function(...args: any[]) { return undefined },
    wrap: function(func) { return undefined },
    setContext: function(context: any) { return undefined },
    resetContext: function() { return undefined },
    beforeNotify: function(func) { return undefined },
    factory: function(config: Config) { return undefined },
  };
}