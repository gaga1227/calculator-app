import { Key } from './key.enum';
import { allKeys, fnKeys, keyCodeMap, keyCodeMapWithShift, numKeys, opKeys } from '../shared/fixtures/key.enum.fixture';

describe('KeyEnum', () => {

  it('should getExpressionText return assigned enum value', () => {
    allKeys.forEach((key: Key) => {
      expect(Key.getExpressionText(key)).toBe(key);
    });
  });

  it('should getDisplayText return correct text value', () => {
    opKeys.forEach((key: Key) => expect(Key.getDisplayText(key)).toBe(key === Key.MULTIPLY ? '&times;' : key));
    [...numKeys, ...fnKeys].forEach((key: Key) => expect(Key.getDisplayText(key)).toBe(key));
  });

  it('should getId return correct key id value', () => {
    expect(Key.getId(null)).toBe(null);
    allKeys.forEach((key: Key) => {
      expect(Key.getId(key)).toBe(Key.getId(key));
    });
  });

  describe('should getKeyFromKeyCode', () => {
    it('return null with unmapped keycode', () => {
      expect(Key.getKeyFromKeyCode(12345, false)).toBeNull();
    });

    it('return corresponding key from a keycode', () => {
      keyCodeMap.forEach((key, keyCode) => {
        expect(Key.getKeyFromKeyCode(keyCode, false)).toBe(key);
      });
    });

    it('return corresponding key from a keycode with shift modifier', () => {
      keyCodeMapWithShift.forEach((key, keyCode) => {
        expect(Key.getKeyFromKeyCode(keyCode, true)).toBe(key);
      });
    });
  });

  it('should isNumberKey return if input key is a number key', () => {
    numKeys.forEach((key: Key) => expect(Key.isNumberKey(key)).toBeTruthy());
    [...opKeys, ...fnKeys].forEach((key: Key) => expect(Key.isNumberKey(key)).toBeFalsy());
  });

  it('should isOperationKey return if input key is an operation key', () => {
    opKeys.forEach((key: Key) => expect(Key.isOperationKey(key)).toBeTruthy());
    [...numKeys, ...fnKeys].forEach((key: Key) => expect(Key.isOperationKey(key)).toBeFalsy());
  });

  it('should isFunctionKey return if input key is a function key', () => {
    fnKeys.forEach((key: Key) => expect(Key.isFunctionKey(key)).toBeTruthy());
    [...numKeys, ...opKeys].forEach((key: Key) => expect(Key.isFunctionKey(key)).toBeFalsy());
  });
});
