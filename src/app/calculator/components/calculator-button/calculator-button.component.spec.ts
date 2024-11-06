import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: ` <!-- prettier-ignore -->
    <calculator-button>
      <span class="projected-content underline">Test Content</span>
    </calculator-button>`,
})
class TestHostComponent {}

describe(`CalculatorButtonComponent`, () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should not apply class is-equal-key when isEqualKey is false', () => {
    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    expect(component.isEqualKey()).toBeFalse();
    expect(hostCssClasses).not.toContain('is-equal-key');
  });

  it('should apply class is-equal-key when isEqualKey is true', () => {
    fixture.componentRef.setInput('isEqualKey', true);
    fixture.detectChanges();

    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    expect(component.isEqualKey()).toBeTrue();
    expect(hostCssClasses).toContain('is-equal-key');
  });

  it('should emit btnClicked when handleClick is called', () => {
    spyOn(component.btnClicked, 'emit');
    component.handleClick();

    expect(component.btnClicked.emit).toHaveBeenCalled();
  });

  it('should set isPressed to true and then to false when keyboardPressedStyle is called', (done) => {
    component.buttonRef()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('1');

    expect(component.isPressed()).toBeTrue();

    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 101);
  });

  it('should not set isPressed to true if key is not matching', () => {
    component.buttonRef()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('2');

    expect(component.isPressed()).toBeFalse();
  });

  it('should display projected content', () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent);
    const compiled = testHostFixture.nativeElement as HTMLElement;
    const projectedContent = compiled.querySelector('.projected-content');

    expect(projectedContent).not.toBeNull();
    expect(projectedContent?.classList.contains('underline')).toBeTrue();
    expect(projectedContent?.textContent).toBe('Test Content');
  });
});
