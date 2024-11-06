import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

describe(`CalculatorComponent`, () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;

  let mockCalculatorService: MockCalculatorService;

  class MockCalculatorService {
    public resultText = jasmine
      .createSpy('resultText')
      .and.returnValue('100.00');
    public subResultText = jasmine
      .createSpy('subResultText')
      .and.returnValue('20');
    public lastOperator = jasmine
      .createSpy('lastOperator')
      .and.returnValue('-');

    public handleKeyInputValue = jasmine.createSpy('handleKeyInputValue');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        { provide: CalculatorService, useClass: MockCalculatorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    mockCalculatorService = TestBed.inject(
      CalculatorService
    ) as unknown as MockCalculatorService;
  });

  it('should create the app', () => {
    console.log('compiled', compiled);
    expect(component).toBeTruthy();
  });

  it('should have initial values', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('20');
    expect(component.lastOperator()).toBe('-');
  });

  it('should display proper calculator values', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('⨉');
    fixture.detectChanges();

    const spanElements: NodeListOf<HTMLSpanElement> =
      compiled.querySelectorAll('span');

    expect(spanElements.length).toBe(2);

    expect(spanElements[0].innerText).toBe('456 ⨉');
    expect(spanElements[1].innerText).toBe('123');

    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('456');
    expect(component.lastOperator()).toBe('⨉');
  });

  it('should have 19 calculator-buttons elements', () => {
    // 1st solution
    const buttonsByDirective = fixture.debugElement.queryAll(
      By.directive(CalculatorButtonComponent)
    );
    expect(buttonsByDirective.length).toBe(19);

    // 2nd solution
    expect(compiled.querySelectorAll('calculator-button').length).toBe(19);

    // 3rd solution
    expect(component.calculatorButtons).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);
  });

  it('every button should have their correct value', () => {
    const buttons = compiled.querySelectorAll('calculator-button');

    expect(buttons[0].textContent?.trim()).toBe('C');
    expect(buttons[1].textContent?.trim()).toBe('+/-');
    expect(buttons[2].textContent?.trim()).toBe('%');
    expect(buttons[3].textContent?.trim()).toBe('÷');
    expect(buttons[4].textContent?.trim()).toBe('7');
    expect(buttons[5].textContent?.trim()).toBe('8');
    expect(buttons[6].textContent?.trim()).toBe('9');
    expect(buttons[7].textContent?.trim()).toBe('⨉');
    expect(buttons[8].textContent?.trim()).toBe('4');
    expect(buttons[9].textContent?.trim()).toBe('5');
    expect(buttons[10].textContent?.trim()).toBe('6');
    expect(buttons[11].textContent?.trim()).toBe('-');
    expect(buttons[12].textContent?.trim()).toBe('1');
    expect(buttons[13].textContent?.trim()).toBe('2');
    expect(buttons[14].textContent?.trim()).toBe('3');
    expect(buttons[15].textContent?.trim()).toBe('+');
    expect(buttons[16].textContent?.trim()).toBe('0');
    expect(buttons[17].textContent?.trim()).toBe('.');
    expect(buttons[18].textContent?.trim()).toBe('=');
  });
});
