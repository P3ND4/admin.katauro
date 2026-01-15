import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorLogService {
  private _errors = new BehaviorSubject<{ name: string, error: string }[]>([]);
  public errors = this._errors.asObservable()

  addError(error: { name: string, error: string }) {
    const current = this._errors.getValue();
    this._errors.next(current.concat([error]));
    setTimeout(() => {
      const current = this._errors.getValue();
      if (current) {
        const current = this._errors.value;
        current.pop();
        this._errors.next(current);
      }
    }, 10000)
  }
}
