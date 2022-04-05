import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  @Input() counter$: Observable<number>;
  @Input() _counter$: any;

  constructor(private counterService: CounterService) {
    
  }

  ngOnInit() {}

  onClicked(): void {
    this.counterService.increase(this._counter$);
  }

  onReset(): void {
    this.counterService.reset(this._counter$);
  }
}