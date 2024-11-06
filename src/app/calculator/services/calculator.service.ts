import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '⨉', '÷', '%'];
const specialOperators = ['C', '+/-', '.', '=', 'Backspace'];

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public handleKeyInputValue(value: string): void {
    //validar input
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log('Invalid input', value);
      return;
    }

    //calcular resultado
    if (value === '=') {
      this.calculateResult();
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
    //TODO: revisar cuando borras numeros negativos
    if (value === 'Backspace') {
      if (this.resultText() === '0') return;

      if (this.resultText().includes('-') && this.resultText().length === 2) {
        this.resultText.set('0');
        return;
      }

      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update((prevValue) => prevValue.slice(0, -1));
      return;
    }

    //aplicar operator
    if (operators.includes(value)) {
      //TODO: remove this if after doing the % operations
      if (value === '%') return;

      this.calculateResult();

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
      if (this.resultText().includes('.')) return;

      this.resultText.update((prevValue) => prevValue + '.');
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
        return;
      }

      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return;
      }

      this.resultText.update((prevValue) => prevValue + value);
      return;
    }
  }

  public calculateResult() {
    const bigNumber = parseFloat(this.resultText());
    const topNumber = parseFloat(this.subResultText());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = topNumber + bigNumber;
        break;

      case '-':
        result = topNumber - bigNumber;
        break;

      case '⨉':
        result = topNumber * bigNumber;
        break;

      case '÷':
        result = topNumber / bigNumber;
        break;

      //TODO: % operations!
      case '%':
        break;

      default:
        console.log('no entró en ningun case del switch');
        break;
    }

    if (result.toString().length >= 8) {
      result = Number(result.toString().slice(0, 8));
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
    this.lastOperator.set('+');
  }
}
