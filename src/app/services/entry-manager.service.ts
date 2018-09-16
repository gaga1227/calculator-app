import { Injectable } from '@angular/core';
import { Key } from '../models/key.enum';
import { MathService } from './math.service';

@Injectable({
  providedIn: 'root'
})
export class EntryManagerService {

  // external UI display states
  private _isDisplayResult = false; // if calculator is displaying result rather than user entries
  private _calcExpression = ''; // latest calculation expression from user entries
  private _calcResult = ''; // calculation result

  // internal business logic states
  private _calcEntries = []; // all user entries
  private _isLastEntryNumber = false; // if last user entry is from number key
  private _isLastEntryOperation = false; // if last user entry is from operation key
  private _hasNumberInLastNumberEntries = false; // if already had number digits within current sequence of number key entries
  private _hasDecimalInLastNumberEntries = false; // if already had decimal within current sequence of number key entries
  private _hasNegateInLastNumberEntries = false; // if already had negate within current sequence of number key entries

  constructor(private _mathService: MathService) {
  }

  get isDisplayResult(): boolean {
    return this._isDisplayResult;
  }

  get calcExpression(): string {
    return this._calcExpression;
  }

  get calcResult(): string {
    return this._calcResult;
  }

  /**
   * handleEntryKey - handler for entry keys
   *
   * @param {Key} key
   * @returns {void}
   */
  handleEntryKey(key: Key) {
    if (!key.length) {
      return false;
    }

    if (Key.isNumberKey(key)) {
      this._handleNumberEntryKey(key);
    } else if (Key.isOperationKey(key)) {
      this._handleOperationEntryKey(key);
    } else if (Key.isFunctionKey(key)) {
      this._handleFunctionEntryKey(key);
    }
  }

  /**
   * _handleNumberEntryKey - handler for number entry keys
   *
   * @param {Key} key
   * @returns {void}
   */
  private _handleNumberEntryKey(key: Key) {
    console.log('[app: EntryManagerService]', '_handleNumberEntryKey:', key);

    const isDecimalKey = key === Key.DECIMAL;
    const isSubtractKey = key === Key.SUBTRACT;

    // prevent more than 1 decimal point added to operations
    if (isDecimalKey && this._isLastEntryNumber && this._hasDecimalInLastNumberEntries) {
      return false;
    }

    // prevent more than 1 negate added to operations
    if (isSubtractKey && this._isLastEntryNumber && this._hasNegateInLastNumberEntries) {
      return false;
    }

    this._addNumberEntry(key);

    this._isDisplayResult = false;
    this._isLastEntryNumber = true;
    this._isLastEntryOperation = false;

    if (isDecimalKey) {
      this._hasDecimalInLastNumberEntries = true;
    } else if (isSubtractKey) {
      this._hasNegateInLastNumberEntries = true;
    } else {
      this._hasNumberInLastNumberEntries = true;
    }
  }

  /**
   * _handleOperationEntryKey - handler for operation entry keys
   *
   * @param {Key} key
   * @returns {void}
   */
  private _handleOperationEntryKey(key: Key) {
    console.log('[app: EntryManagerService]', '_handleOperationEntryKey:', key);

    const isSubtractKey = key === Key.SUBTRACT;

    // disallow start with an operation entry
    // except for subtract key, which can also be a negate number key
    if (this._calcEntries.length === 0) {
      if (isSubtractKey) {
        this._handleNumberEntryKey(key);
      }
      return false;
    }

    // disallow adding operation entry after a number entry sequence without an actual number
    if (this._isLastEntryNumber && !this._hasNumberInLastNumberEntries) {
      return false;
    }

    // allow subtract key as negate sign for a new number entry sequence
    // all operation keys, except for subtract, will replace previous operation entry
    if (this._isLastEntryOperation && isSubtractKey) {
      this._handleNumberEntryKey(key);
      return false;
    } else if (this._isLastEntryOperation && !isSubtractKey) {
      this._replaceLastOperationEntry(key);
    } else {
      this._addOperationEntry(key);
    }

    this._isLastEntryNumber = false;
    this._isLastEntryOperation = true;

    this._hasDecimalInLastNumberEntries = false;
    this._hasNegateInLastNumberEntries = false;
    this._hasNumberInLastNumberEntries = false;
  }

  /**
   * _handleFunctionEntryKey - handler for function entry keys
   *
   * @param {Key} key
   * @returns {void}
   */
  private _handleFunctionEntryKey(key: Key) {
    console.log('[app: EntryManagerService]', '_handleFunctionEntryKey:', key);

    if (key === Key.CALC) {
      // disallow when result is already displayed
      if (this._isDisplayResult) {
        return false;
      }

      // disallow calculation when last number entry sequence has no actual number
      if (this._isLastEntryNumber && !this._hasNumberInLastNumberEntries) {
        return false;
      }

      // disallow empty expression
      if (!this._calcExpression.trim().length) {
        return false;
      }

      this._calcResult = this._mathService.getCalcResultDisplay(this._calcExpression);
      this._isDisplayResult = true;
    } else if (key === Key.ALL_CANCEL) {
      this._calcResult = '';
      this._isDisplayResult = false;
    }

    this._isLastEntryNumber = false;
    this._isLastEntryOperation = false;

    this._calcEntries = [];
    this._calcExpression = '';
    this._hasDecimalInLastNumberEntries = false;
    this._hasNegateInLastNumberEntries = false;
    this._hasNumberInLastNumberEntries = false;
  }

  /**
   * _addNumberEntry - add number entry
   *
   * @param {Key} entryKey
   */
  private _addNumberEntry(entryKey: Key) {
    this._calcEntries.push(entryKey);
    this._calcExpression += Key.getExpressionText(entryKey);
  }

  /**
   * _addOperationEntry - add operation entry
   *
   * @param {Key} entryKey
   */
  private _addOperationEntry(entryKey: Key) {
    this._calcEntries.push(entryKey);
    this._calcExpression += ` ${Key.getExpressionText(entryKey)} `;
  }

  /**
   * _replaceLastOperationEntry - replace last operation entry
   *
   * @param {Key} entryKey
   */
  private _replaceLastOperationEntry(entryKey: Key) {
    this._calcEntries.splice(-1, 1);
    this._calcExpression = this._calcExpression.slice(0, -3); // all current operation entries have a length of 3
    this._addOperationEntry(entryKey);
  }
}
