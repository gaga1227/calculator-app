import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayWindowComponent } from './display-window.component';

describe('displayWindowComponent', () => {
  let component: DisplayWindowComponent;
  let fixture: ComponentFixture<DisplayWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render displayText correctly', () => {
    const compiled = fixture.debugElement.nativeElement;

    // default
    expect(compiled.querySelector('span').textContent).toBe('');

    // displayText update
    const expectedDisplayText = '12345';
    component.displayText = expectedDisplayText;
    fixture.detectChanges();
    expect(compiled.querySelector('span').textContent).toBe(expectedDisplayText);
  });

  it('should render correct modifier class based on isDisplayResult', () => {
    const compiled = fixture.debugElement.nativeElement;
    const expectedClassResult = '--result';
    const expectedClassEntries = '--entries';

    // default
    expect(compiled.firstElementChild.classList.value).toContain(expectedClassEntries);

    // isDisplayResult update
    component.isDisplayResult = true;
    fixture.detectChanges();
    expect(compiled.firstElementChild.classList.value).toContain(expectedClassResult);
  });
});
