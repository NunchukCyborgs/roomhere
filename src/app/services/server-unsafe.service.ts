import { Injectable } from "@angular/core";

@Injectable()
export class ServerUnsafeService {
  public tryUnsafeCode(fn: () => any, catchMessage: string): any {
    try { return fn() }
    catch (err) {
      console.log(
        '>> Tried to execute server unsafe code.',
        err.toString().substr(0, 50),
        '... This error should be about: ',
        catchMessage
      );
      return undefined
    }
  }
}