import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });
  beforeAll(() => {
    console.log('beforeAll');
  });
  afterEach(() => {
    console.log('afterEach');
  });
  afterAll(() => {
    console.log('afterAll');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  //qodo test
  it('should handle key input correctly', () => {
    service.handleKeyInputValue('5');
    expect(service.resultText()).toBe('5');
    service.handleKeyInputValue('8');
    expect(service.resultText()).toBe('58');
  });

  //codeium test
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

  //codeium test
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
});
