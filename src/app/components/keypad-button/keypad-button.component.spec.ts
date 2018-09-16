import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KeypadButtonComponent } from './keypad-button.component';
import { Key } from '../../models/key.enum';
import Spy = jasmine.Spy;

describe('KeypadButtonComponent', () => {
  let component: KeypadButtonComponent;
  let fixture: ComponentFixture<KeypadButtonComponent>;
  let spyKeyGetId: Spy;
  let spyKeyGetDisplayText: Spy;
  let spyComponentKeypadClickEmit: Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KeypadButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should ngOnInit assign key id to keyButtonId', () => {
    spyKeyGetId = spyOn(Key, 'getId').and.callThrough();

    const expectedKey = Key.ADD;
    component.key = expectedKey;

    component.ngOnInit();

    expect(spyKeyGetId).toHaveBeenCalledTimes(1);
    expect(spyKeyGetId).toHaveBeenCalledWith(expectedKey);
    expect(component.keyButtonId).toBe('appKeypadBtnAdd');
  });

  it('should ngOnInit assign key to keyButtonDisplayText', () => {
    spyKeyGetDisplayText = spyOn(Key, 'getDisplayText');

    const expectedKey = Key.ADD;
    component.key = expectedKey;

    component.ngOnInit();

    expect(spyKeyGetDisplayText).toHaveBeenCalledTimes(1);
    expect(spyKeyGetDisplayText).toHaveBeenCalledWith(expectedKey);
    _assertCustomState(Key.getDisplayText(expectedKey), false);
  });

  it('should ngOnChanges updates isMappedKeyboardKeyDown', () => {
    component.key = Key.ADD;

    component.keyboardKeyDown = Key.ADD;
    component.ngOnInit();
    component.ngOnChanges(null);
    _assertCustomState(Key.getDisplayText(Key.ADD), true);

    component.keyboardKeyDown = Key.ONE;
    component.ngOnInit();
    component.ngOnChanges(null);
    _assertCustomState(Key.getDisplayText(Key.ADD), false);
  });

  it('should onClick call keypadClick.emit', () => {
    spyComponentKeypadClickEmit = spyOn(component.keypadClick, 'emit');

    component.key = Key.CALC;
    component.onClick();
    expect(spyComponentKeypadClickEmit).toHaveBeenCalledTimes(1);
    expect(spyComponentKeypadClickEmit).toHaveBeenCalledWith(Key.CALC);

    spyComponentKeypadClickEmit.calls.reset();

    component.key = Key.ADD;
    component.onClick();
    expect(spyComponentKeypadClickEmit).toHaveBeenCalledTimes(1);
    expect(spyComponentKeypadClickEmit).toHaveBeenCalledWith(Key.ADD);
  });

  // utils
  function _assertCustomState(expectedKeyButtonDisplayText: string, expectedIsMappedKeyboardKeyDown: boolean) {
    expect(component.keyButtonDisplayText).toBe(expectedKeyButtonDisplayText);
    expect(component.isMappedKeyboardKeyDown).toBe(expectedIsMappedKeyboardKeyDown);
  }
});
