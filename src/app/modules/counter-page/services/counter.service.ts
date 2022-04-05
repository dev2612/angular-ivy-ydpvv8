import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CounterService implements OnDestroy {
  public _counter$ = new BehaviorSubject<number>(0)
  counter$ = this._counter$.asObservable();
  public _counter1$ = new BehaviorSubject<number>(0)
  counter1$ = this._counter1$.asObservable();

  increase(_counter$): void {
    _counter$.next(_counter$.getValue() + 1);
  }

  reset(_counter$): void {
    _counter$.next(0);
  }

  ngOnDestroy(): void {
    this._counter$.next(0);
    this._counter$.complete();

    this._counter1$.next(0);
    this._counter1$.complete();
  }
}