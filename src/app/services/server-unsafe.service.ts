import { Injectable } from "@angular/core";

@Injectable()
export class ServerUnsafeService {
  public tryUnsafeCode(fn: () => any, catchMessage: string): any {
    try { return fn() }
    catch (err) {
      console.log('>>');
      console.log('>> Tried to execute server unsafe code.');
      console.log('>> Err: ', err.toString().substr(0, 50));
      console.log('>> This error should be about: ', catchMessage); 
      console.log('>>');
      return undefined
    }
  }
}