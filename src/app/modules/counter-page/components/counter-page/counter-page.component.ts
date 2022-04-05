import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Observable, Subject, combineLatest, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CounterComponent } from '../counter/counter.component';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.scss'],
})
export class CounterPageComponent implements OnInit, OnDestroy, AfterViewInit {
  totalCounter$: Observable<number>;

  @ViewChildren(CounterComponent)
  counterComponentList: QueryList<CounterComponent>;

  private destroy$ = new Subject();

  constructor(public counterService: CounterService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    let observables = [];
    this.counterComponentList.forEach((element) => {
      observables.push(element.counter$);
    });

    combineLatest(observables).subscribe((values) => {
      let total = 0;
      values.forEach((value) => (total += value));
      this.totalCounter$ = of(total).pipe(takeUntil(this.destroy$));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}