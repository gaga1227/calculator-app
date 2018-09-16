import { TestBed } from '@angular/core/testing';
import { Key } from '../models/key.enum';

import { EntryManagerService } from './entry-manager.service';

describe('EntryManagerService', () => {
  let service: EntryManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntryManagerService]
    });
    service = TestBed.get(EntryManagerService);
  });

  it('should be created with default state values', () => {
    _assertDefaultStates();
  });

  it('should update calculation expression', () => {
    _assertDefaultStates();

    service.handleEntryKey(Key.ONE);
    service.handleEntryKey(Key.ADD);
    service.handleEntryKey(Key.TWO);
    _assertCustomStates(false, '1 + 2', '');
  });

  it('should update calculation result and display state', () => {
    _assertDefaultStates();

    service.handleEntryKey(Key.TWO);
    service.handleEntryKey(Key.SUBTRACT);
    service.handleEntryKey(Key.ONE);
    _assertCustomStates(false, '2 - 1', '');

    service.handleEntryKey(Key.CALC);
    _assertCustomStates(true, '', '1');
  });

  it('should clear calculation expression and result with all cancel entry', () => {
    _assertDefaultStates();

    service.handleEntryKey(Key.TWO);
    service.handleEntryKey(Key.SUBTRACT);
    service.handleEntryKey(Key.ONE);
    _assertCustomStates(false, '2 - 1', '');
    service.handleEntryKey(Key.ALL_CANCEL);
    _assertCustomStates(false, '', '');

    service.handleEntryKey(Key.TWO);
    service.handleEntryKey(Key.SUBTRACT);
    service.handleEntryKey(Key.ONE);
    service.handleEntryKey(Key.CALC);
    _assertCustomStates(true, '', '1');
    service.handleEntryKey(Key.ALL_CANCEL);
    _assertCustomStates(false, '', '');
  });

  it('should not update calculation expression with more than one decimal entry', () => {
    _assertDefaultStates();

    service.handleEntryKey(Key.ONE);
    service.handleEntryKey(Key.DECIMAL);
    service.handleEntryKey(Key.TWO);
    _assertCustomStates(false, '1.2', '');

    service.handleEntryKey(Key.DECIMAL);
    _assertCustomStates(false, '1.2', '');
  });

  it('should not update calculation expression with more than one negate entry', () => {
    _assertDefaultStates();

    service.handleEntryKey(Key.SUBTRACT);
    service.handleEntryKey(Key.ONE);
    _assertCustomStates(false, '-1', '');

    service.handleEntryKey(Key.SUBTRACT);
    _assertCustomStates(false, '-1 - ', '');
  });

  it('should not start calculation expression with operation entry except for negate', () => {
    _assertDefaultStates();

    service.handleEntryKey(Key.ADD);
    _assertCustomStates(false, '', '');
    service.handleEntryKey(Key.MULTIPLY);
    _assertCustomStates(false, '', '');
    service.handleEntryKey(Key.DIVIDE);
    _assertCustomStates(false, '', '');
  });

  it('should not add operation entry after incomplete number entry sequence', () => {
    _assertDefaultStates();

    service.handleEntryKey(Key.SUBTRACT);
    service.handleEntryKey(Key.DECIMAL);
    _assertCustomStates(false, '-.', '');
    service.handleEntryKey(Key.ADD);
    _assertCustomStates(false, '-.', '');
    service.handleEntryKey(Key.SUBTRACT);
    _assertCustomStates(false, '-.', '');
    service.handleEntryKey(Key.MULTIPLY);
    _assertCustomStates(false, '-.', '');
    service.handleEntryKey(Key.DIVIDE);
    _assertCustomStates(false, '-.', '');
  });

  it('should continue calculation expression with negate sign', () => {
    _assertDefaultStates();

    service.handleEntryKey(Key.ONE);
    service.handleEntryKey(Key.ADD);
    _assertCustomStates(false, '1 + ', '');
    service.handleEntryKey(Key.SUBTRACT);
    _assertCustomStates(false, '1 + -', '');
  });

  it('should replace last operation entry in calculation expression', () => {
    _assertDefaultStates();

    service.handleEntryKey(Key.ONE);
    service.handleEntryKey(Key.ADD);
    _assertCustomStates(false, '1 + ', '');
    service.handleEntryKey(Key.MULTIPLY);
    _assertCustomStates(false, '1 * ', '');
    service.handleEntryKey(Key.DIVIDE);
    _assertCustomStates(false, '1 / ', '');
  });

  it('should only update calculation result when not in display result state', () => {
    _assertDefaultStates();

    service.handleEntryKey(Key.ONE);
    service.handleEntryKey(Key.ADD);
    service.handleEntryKey(Key.ONE);
    service.handleEntryKey(Key.CALC);
    _assertCustomStates(true, '', '2');
    service.handleEntryKey(Key.CALC);
    _assertCustomStates(true, '', '2');
  });

  it('should not update calculation result when last number entry sequence is incomplete', () => {
    _assertDefaultStates();

    service.handleEntryKey(Key.SUBTRACT);
    service.handleEntryKey(Key.DECIMAL);
    _assertCustomStates(false, '-.', '');
    service.handleEntryKey(Key.CALC);
    _assertCustomStates(false, '-.', '');
  });

  it('should not update calculation result with empty calculation expression', () => {
    _assertDefaultStates();

    service.handleEntryKey(Key.CALC);
    _assertCustomStates(false, '', '');
  });

  // utils
  function _assertDefaultStates() {
    expect(service.isDisplayResult).toBeFalsy();
    expect(service.calcExpression).toBe('');
    expect(service.calcResult).toBe('');
  }

  function _assertCustomStates(expectedDisplayResult: boolean, expectedCalcExpression: string, expectedCalcResult: string) {
    expect(service.isDisplayResult).toBe(expectedDisplayResult);
    expect(service.calcExpression).toBe(expectedCalcExpression);
    expect(service.calcResult).toBe(expectedCalcResult);
  }
});
