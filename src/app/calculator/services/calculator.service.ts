import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '⨉', '/', '÷'];
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

    // limitar numeros de caracteres
    if (this.resultText().length >= 8) {
      console.log('Max length reached');
      return;
    }

    //validar punto decimal
    if (value === '.') {
      if (!this.resultText().includes('.')) {
        this.resultText.update((prevValue) => prevValue + '.');
        return;
      }
      return;
    }

    //manejo del cero inicial
    if (
      value === '0' &&
      (this.resultText() === '0' || this.resultText() === '-0')
    ) {
      return;
    }

    //cambiar de signo
    if (value === '+/-') {
      console.log('es mas menos');
      if (this.resultText().includes('-')) {
        this.resultText.update((prevValue) => prevValue.slice(1));
        return;
      }
      this.resultText.update((prevValue) => '-' + prevValue);
      return;
    }

    //numeros (ultima condición)
    if (numbers.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
      }

      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
      }

      this.resultText.update((prevValue) => prevValue + value);
      return;
    }
  }
}
