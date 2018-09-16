import { Injectable } from '@angular/core';
import * as math from 'mathjs';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  static readonly BAD_EXP_STR = 'BAD EXPRESSION';

  constructor() {}

  /**
   * getCalcResultDisplay - returns calculation result display text from a calculation expression
   *
   * @param {string} calcExp  calculation expression string from entries
   * @returns {string}
   */
  getCalcResultDisplay(calcExp: string) {
    let result = '';

    if (!calcExp.length) {
      return '';
    }

    try {
      // evaluate calculation expression and format result via MathJs library
      // can be swapped with another math library if required in future
      result = math.format(math.eval(calcExp), {
        precision: 16,
        upperExp: 16
      });
    } catch (ex) {
      console.warn('[app: MathService]', ex);
      result = MathService.BAD_EXP_STR;
    }

    return result;
  }
}
