import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });
  // beforeAll(() => {});
  // afterEach(() => {});
  // afterAll(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should handle key input correctly', () => {
    service.handleKeyInputValue('5');
    expect(service.resultText()).toBe('5');
    service.handleKeyInputValue('8');
    expect(service.resultText()).toBe('58');
  });

  it('should calculate result correctly for addition', () => {
    service.handleKeyInputValue('2');
    service.handleKeyInputValue('+');
    service.handleKeyInputValue('3');
    service.handleKeyInputValue('=');
    expect(service.resultText()).toBe('5');
  });

  it('should calculate result correctly for subtraction', () => {
    service.handleKeyInputValue('2');
    service.handleKeyInputValue('-');
    service.handleKeyInputValue('3');
    service.handleKeyInputValue('=');
    expect(service.resultText()).toBe('-1');
  });

  it('should calculate result correctly for multiplication', () => {
    service.handleKeyInputValue('5');
    service.handleKeyInputValue('⨉');
    service.handleKeyInputValue('7');
    service.handleKeyInputValue('=');
    expect(service.resultText()).toBe('35');
  });

  it('should calculate result correctly for divition', () => {
    service.handleKeyInputValue('8');
    service.handleKeyInputValue('÷');
    service.handleKeyInputValue('2');
    service.handleKeyInputValue('=');
    expect(service.resultText()).toBe('4');
  });

  it('handle the % operator', () => {
    //TODO: add implementation
  });

  it('should handle decimal points correctly', () => {
    service.handleKeyInputValue('6');
    service.handleKeyInputValue('.');
    service.handleKeyInputValue('5');

    expect(service.resultText()).toBe('6.5');

    service.handleKeyInputValue('.');
    service.handleKeyInputValue('.');
    expect(service.resultText()).toBe('6.5');
  });

  it('should handle decimal points correctly, starting with 0', () => {
    service.handleKeyInputValue('.');
    service.handleKeyInputValue('.');
    service.handleKeyInputValue('.');
    service.handleKeyInputValue('5');

    expect(service.resultText()).toBe('0.5');
  });

  it('should reset calculator state to default values when C is pressed', () => {
    service.handleKeyInputValue('5');
    service.handleKeyInputValue('+');
    service.handleKeyInputValue('3');
    service.handleKeyInputValue('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should handle operators correctly', () => {
    service.handleKeyInputValue('5');
    service.handleKeyInputValue('-');

    expect(service.subResultText()).toBe('5');
    expect(service.lastOperator()).toBe('-');
    expect(service.resultText()).toBe('0');
  });

  it('should handle sign change correctly', () => {
    service.handleKeyInputValue('7');
    service.handleKeyInputValue('+/-');

    expect(service.resultText()).toBe('-7');

    service.handleKeyInputValue('+/-');
    expect(service.resultText()).toBe('7');
  });

  it('should handle backspace correctly', () => {
    service.handleKeyInputValue('5');
    service.handleKeyInputValue('8');
    service.handleKeyInputValue('9');
    expect(service.resultText()).toBe('589');

    service.handleKeyInputValue('Backspace');
    expect(service.resultText()).toBe('58');

    service.handleKeyInputValue('Backspace');
    expect(service.resultText()).toBe('5');

    service.handleKeyInputValue('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('handle backspace when result is 0', () => {
    service.handleKeyInputValue('0');
    service.handleKeyInputValue('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('handle backspace when result is negative and has only 1 digit', () => {
    service.handleKeyInputValue('7');
    service.handleKeyInputValue('+/-');
    expect(service.resultText()).toBe('-7');
    expect(service.resultText().length).toBe(2);

    service.handleKeyInputValue('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle maximum input length', () => {
    for (let i = 0; i < 20; i++) {
      service.handleKeyInputValue('9');
    }
    expect(service.resultText()).toBe('99999999');
  });

  it('should handle maximum result length', () => {
    for (let i = 0; i < 20; i++) {
      service.handleKeyInputValue('9');
    }

    expect(service.resultText()).toBe('99999999');
    expect(service.resultText().length).toBe(8);

    service.handleKeyInputValue('+');
    service.handleKeyInputValue('9');
    service.handleKeyInputValue('=');

    expect(service.resultText()).toBe('10000000');
    expect(service.resultText().length).toBe(8);
  });

  it('handle invalid input', () => {
    service.handleKeyInputValue('a');
    expect(service.resultText()).toBe('0');
  });

  it('handle negative zero', () => {
    service.handleKeyInputValue('0');
    service.handleKeyInputValue('+/-');
    expect(service.resultText()).toBe('-0');

    service.handleKeyInputValue('0');
    expect(service.resultText()).toBe('-0');
  });

  it('add number when there is a negative zero', () => {
    service.handleKeyInputValue('0');
    service.handleKeyInputValue('+/-');
    expect(service.resultText()).toBe('-0');

    service.handleKeyInputValue('5');
    expect(service.resultText()).toBe('-5');
  });
});
