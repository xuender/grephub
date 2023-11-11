import { Component, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-animated-number',
  templateUrl: './animated-number.component.html',
  standalone: true,
})
export class AnimatedNumberComponent implements OnDestroy {
  @Input()
  num = 0;
  display = 0;
  private check;
  private ticket: any;
  private old = 0;
  constructor() {
    this.check = setInterval(() => {
      console.log('time');
      if (this.ticket) {
        clearInterval(this.ticket);
        this.ticket = undefined;
        this.display = this.num;
        this.old = this.num;
      }

      if (this.old != this.num) {
        const step = Math.floor((this.num - this.old) / 10);
        this.old = this.num;

        this.ticket = setInterval(() => {
          this.display += step;
        }, 100);
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.check);
  }
}
