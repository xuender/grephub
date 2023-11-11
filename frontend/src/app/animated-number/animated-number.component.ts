import { Component, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-animated-number',
  templateUrl: './animated-number.component.html',
  standalone: true,
})
export class AnimatedNumberComponent implements OnDestroy {
  @Input()
  num = 0;
  @Input()
  tick = 8;
  display = 0;
  private check;
  private step = 0;
  private len = -1;
  constructor() {
    this.check = setInterval(() => {
      if (this.num == this.display) {
        return;
      }

      switch (this.len) {
        case 0:
          this.display = this.num;
          this.len = -1;

          return;
        // @ts-ignore
        case -1:
          this.step = Math.ceil((this.num - this.display) / this.tick);
          this.len = this.tick;
        default:
          this.display += this.step;
          this.len--;
      }
    }, 100);
  }

  ngOnDestroy() {
    clearInterval(this.check);
  }
}
