/**
 * Key - calculator keypad key type
 */
enum Key {
  // number keys
  ZERO = '0',
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  DECIMAL = '.',

  // operation keys
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '*',
  DIVIDE = '/',

  // function keys
  CALC = '=',
  ALL_CANCEL = 'AC'
}

namespace Key {

  /**
   * getExpressionText - returns expression text for the key
   *
   * @param {Key} key  input key
   * @returns {string}
   */
  export function getExpressionText(key: Key) {
    switch (key) {
      default:
        return key;
    }
  }

  /**
   * getDisplayText - returns display text for the key
   *
   * @param {Key} key  input key
   * @returns {string}
   */
  export function getDisplayText(key: Key) {
    switch (key) {
      case Key.MULTIPLY:
        return '&times;';
      default:
        return key;
    }
  }

  /**
   * getId - returns Key enum type's DOM id string
   *
   * @param {Key} key  input key
   * @returns {string}
   */
  export function getId(key: Key) {
    switch (key) {
      // number keys
      case Key.ZERO:
        return 'Zero';
      case Key.ONE:
        return 'One';
      case Key.TWO:
        return 'Two';
      case Key.THREE:
        return 'Three';
      case Key.FOUR:
        return 'Four';
      case Key.FIVE:
        return 'Five';
      case Key.SIX:
        return 'Six';
      case Key.SEVEN:
        return 'Seven';
      case Key.EIGHT:
        return 'Eight';
      case Key.NINE:
        return 'Nine';
      case Key.DECIMAL:
        return 'Decimal';

      // operation keys
      case Key.ADD:
        return 'Add';
      case Key.SUBTRACT:
        return 'Subtract';
      case Key.MULTIPLY:
        return 'Multiply';
      case Key.DIVIDE:
        return 'Divide';

      // function keys
      case Key.CALC:
        return 'Calc';
      case Key.ALL_CANCEL:
        return 'AllCancel';

      default:
        return null;
    }
  }

  /**
   * getKeyFromKeyCode - returns Key enum type based on keyboard event key code and modifiers
   *
   * @param {number} keyCode    keyboard event key code
   * @param {boolean} shiftKey  if shift modifier is used
   * @returns {Key} key
   */
  export function getKeyFromKeyCode(keyCode: number, shiftKey: boolean) {
    switch (keyCode) {
      // number keys
      case 48:
      case 96:
        return Key.ZERO;
      case 49:
      case 97:
        return Key.ONE;
      case 50:
      case 98:
        return Key.TWO;
      case 51:
      case 99:
        return Key.THREE;
      case 52:
      case 100:
        return Key.FOUR;
      case 53:
      case 101:
        return Key.FIVE;
      case 54:
      case 102:
        return Key.SIX;
      case 55:
      case 103:
        return Key.SEVEN;
      case 56: // * or 8
        return shiftKey ? Key.MULTIPLY : Key.EIGHT;
      case 104:
        return Key.EIGHT;
      case 57:
      case 105:
        return Key.NINE;
      case 190:
      case 110:
        return Key.DECIMAL;

      // operation keys
      case 107:
        return Key.ADD;
      case 109:
      case 189: // dash
        return Key.SUBTRACT;
      case 106:
        return Key.MULTIPLY;
      case 111:
      case 191: // forward slash
        return Key.DIVIDE;

      // function keys
      case 13: // enter
        return Key.CALC;
      case 187: // plus sign or equal
        return shiftKey ? Key.ADD : Key.CALC;
      case 8: // backspace
      case 27: // Escape
        return Key.ALL_CANCEL;

      default:
        return null;
    }
  }

  /**
   * isNumberKey - returns if input key is a number key
   *
   * @param {Key} key  input key
   * @returns {boolean}
   */
  export function isNumberKey(key: Key) {
    switch (key) {
      case Key.ZERO:
      case Key.ONE:
      case Key.TWO:
      case Key.THREE:
      case Key.FOUR:
      case Key.FIVE:
      case Key.SIX:
      case Key.SEVEN:
      case Key.EIGHT:
      case Key.NINE:
      case Key.DECIMAL:
        return true;
      default:
        return false;
    }
  }

  /**
   * isOperationKey - returns if input key is an operation key
   *
   * @param {Key} key  input key
   * @returns {boolean}
   */
  export function isOperationKey(key: Key) {
    switch (key) {
      case Key.ADD:
      case Key.SUBTRACT:
      case Key.MULTIPLY:
      case Key.DIVIDE:
        return true;
      default:
        return false;
    }
  }

  /**
   * isFunctionKey - returns if input key is a function key
   *
   * @param {Key} key  input key
   * @returns {boolean}
   */
  export function isFunctionKey(key: Key) {
    switch (key) {
      case Key.CALC:
      case Key.ALL_CANCEL:
        return true;
      default:
        return false;
    }
  }
}

export {Key};
