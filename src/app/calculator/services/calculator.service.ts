import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];
const specialOperators = ['C', '+/-', '%', '.', '=', 'backspace'];

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value: string): void {
    //validar input
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log('Invalid input', value);
      return;
    }

    //TODO:
    if (value === '=') {
      console.log('calcular resultado');
      return;
    }

    //limpiar resultado
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    //backspace
    //TODO: revisar con numeros negativos
    if (value === 'backspace') {
      if (this.resultText() === '0') return;

      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update((prevValue) => prevValue.slice(0, -1));
      return;
    }

    //aplicar operator
    if (operators.includes(value)) {
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    //validar punto decimal
    if (value === '.' && !this.resultText().includes('.')) {
      this.resultText.update((prevValue) => prevValue + '.');
      return;
    }
  }
}
