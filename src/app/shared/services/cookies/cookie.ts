import { CookieOptionsArgs } from "./cookie-options-args.model";

export abstract class Cookie {
  abstract get(key: string): string
  abstract put(key: string, value: string, options?: CookieOptionsArgs)
  abstract getAll(): Object
}
