import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    '[class.is-equal-key]': 'isEqualKey()',
    '[class.is-operator-key]': 'isOperatorKey()',
  },
})
export class CalculatorButtonComponent {
  public isPressed = signal(false);
  public btnClicked = output<string>();
  public buttonRef = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isOperatorKey = input(false, {
    transform: (value: boolean | string) => {
      return typeof value === 'string' ? value === '' : value;
    },
  });

  public isEqualKey = input(false, {
    transform: (value: boolean | string) => {
      return typeof value === 'string' ? value === '' : value;
    },
  });

  handleClick(): void {
    if (!this.buttonRef()) return;

    const value = this.buttonRef()!.nativeElement.innerText;
    this.btnClicked.emit(value.trim());
  }

  keyboardPressedStyle(key: string) {
    if (!this.buttonRef()) return;

    const value = this.buttonRef()!.nativeElement.innerText;

    if (value !== key) return;

    this.isPressed.set(true);
    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
