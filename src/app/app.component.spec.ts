import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { EntryManagerService } from './services/entry-manager.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Key } from './models/key.enum';

describe('AppComponent', () => {
  let fixture;
  let component;
  let entryManagerService;

  let spyHandleEntryKey;
  let spyIsDisplayResult;
  let spyCalcExpression;
  let spyCalcResult;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        EntryManagerService,
      ],
      schemas: [NO_ERRORS_SCHEMA] // not to error on unknown elements and attributes
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    entryManagerService = TestBed.get(EntryManagerService);
    fixture.detectChanges();

    spyHandleEntryKey = spyOn(entryManagerService, 'handleEntryKey');

    _assetDefaultStates();
  });

  it('should onKeypadSelect call entry manager and get states', () => {
    const keySelected = Key.ONE;
    const expectedIsDisplayResult = false;
    const expectedCalcExp = '1';
    const expectedCalcResult = '';

    spyIsDisplayResult = spyOnProperty(entryManagerService, 'isDisplayResult', 'get');
    spyIsDisplayResult.and.returnValue(expectedIsDisplayResult);
    spyCalcExpression = spyOnProperty(entryManagerService, 'calcExpression', 'get');
    spyCalcExpression.and.returnValue(expectedCalcExp);
    spyCalcResult = spyOnProperty(entryManagerService, 'calcResult', 'get');
    spyCalcResult.and.returnValue(expectedCalcResult);

    component.onKeypadSelect(keySelected);

    expect(spyHandleEntryKey).toHaveBeenCalledTimes(1);
    expect(spyHandleEntryKey).toHaveBeenCalledWith(keySelected);
    _assetCustomStates(expectedIsDisplayResult, expectedCalcExp, expectedCalcResult, null);
  });

  describe('should onDocumentKeyEvents', () => {
    it('return false when event keycode is NaN', () => {
      const mockKeyEvent = _mockKeyEvent('keydown', '', false);
      expect(component.onDocumentKeyEvents(mockKeyEvent)).toBeFalsy();
      _assetCustomStates(false, '', '', null);
    });

    it('return false when event shiftkey is not a boolean', () => {
      const mockKeyEvent = _mockKeyEvent('keydown', 13, null);
      expect(component.onDocumentKeyEvents(mockKeyEvent)).toBeFalsy();
      _assetCustomStates(false, '', '', null);
    });

    it('return false when event keycode is not recognised', () => {
      const mockKeyEvent = _mockKeyEvent('keydown', 888, false);
      expect(component.onDocumentKeyEvents(mockKeyEvent)).toBeFalsy();
      _assetCustomStates(false, '', '', null);
    });

    it('update currentKeyboardKey state with recognised key', () => {
      const mockKeyCode = 97;
      let mockKeyEvent;

      mockKeyEvent = _mockKeyEvent('keydown', mockKeyCode, false);
      component.onDocumentKeyEvents(mockKeyEvent);
      _assetCustomStates(false, '', '', Key.getKeyFromKeyCode(mockKeyCode, false));

      mockKeyEvent = _mockKeyEvent('keyup', mockKeyCode, false);
      component.onDocumentKeyEvents(mockKeyEvent);
      _assetCustomStates(false, '', '', null);
    });
  });

  // util
  function _assetDefaultStates() {
    expect(component.isDisplayResult).toBeFalsy();
    expect(component.calcExpressionDisplay).toBe('');
    expect(component.calcResultDisplay).toBe('');
    expect(component.currentKeyboardKeyDown).toBeNull();
  }

  function _assetCustomStates(
    expectedIsDisplayResult: boolean,
    expectedCalcExp: string,
    expectedCalcResult: string,
    expectedKeyDown: Key | null) {

    expect(component.isDisplayResult).toBe(expectedIsDisplayResult);
    expect(component.calcExpressionDisplay).toBe(expectedCalcExp);
    expect(component.calcResultDisplay).toBe(expectedCalcResult);
    expect(component.currentKeyboardKeyDown).toBe(expectedKeyDown);
  }

  function _mockKeyEvent(mockType: any, mockKeycode: any, mockShiftKey: any) {
    return {
      type: mockType,
      keyCode: mockKeycode,
      shiftKey: mockShiftKey
    };
  }
});
