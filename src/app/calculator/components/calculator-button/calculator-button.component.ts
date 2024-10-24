import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
  },
})
export class CalculatorButtonComponent {
  public isCommand = input(false, {
    transform: (value: boolean | string) => {
      return typeof value === 'string' ? value === '' : value;
    },
  });

  public biggerText = input(false, {
    transform: (value: boolean | string) => {
      return typeof value === 'string' ? value === '' : value;
    },
  });

  public textTransparent = input(false, {
    transform: (value: boolean | string) => {
      return typeof value === 'string' ? value === '' : value;
    },
  });

  public lastRow = input(false, {
    transform: (value: boolean | string) => {
      return typeof value === 'string' ? value === '' : value;
    },
  });

  public isEqualBtn = input(false, {
    transform: (value: boolean | string) => {
      return typeof value === 'string' ? value === '' : value;
    },
  });

  @HostBinding('class.is-command') get commandStyle() {
    return this.isCommand();
  }
  @HostBinding('class.bigger-text') get biggerTextStyle() {
    return this.biggerText();
  }
  @HostBinding('class.text-transparent') get textTransparentStyle() {
    return this.textTransparent();
  }
  @HostBinding('class.last-row') get lastRowStyle() {
    return this.lastRow();
  }
  @HostBinding('class.is-equal-btn') get isEqualBtnStyle() {
    return this.isEqualBtn();
  }
}
