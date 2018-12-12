import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class LoadingService {

  private _count = 0;
  private _subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get loading(): Observable<boolean> {
    return this._subject.asObservable();
  }

  start() {
    ++this._count;
    this._subject.next(true);
  }

  stop(force: boolean = true) {
    --this._count;
    if (force || this._count === 0) {
      this._count = 0;
      this._subject.next(false);
    }
  }
}
