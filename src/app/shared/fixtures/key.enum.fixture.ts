import { Key } from '../../models/key.enum';

const numKeys = [
  Key.ONE,
  Key.TWO,
  Key.THREE,
  Key.FOUR,
  Key.FIVE,
  Key.SIX,
  Key.SEVEN,
  Key.EIGHT,
  Key.NINE,
  Key.DECIMAL,
  Key.ZERO
];

const opKeys = [
  Key.DIVIDE,
  Key.MULTIPLY,
  Key.SUBTRACT,
  Key.ADD
];

const fnKeys = [
  Key.CALC,
  Key.ALL_CANCEL
];

const allKeys = [...numKeys, ...opKeys, ...fnKeys];

const keyCodeMap = new Map([
  [48, Key.ZERO],
  [96, Key.ZERO],
  [49, Key.ONE],
  [97, Key.ONE],
  [50, Key.TWO],
  [98, Key.TWO],
  [51, Key.THREE],
  [99, Key.THREE],
  [52, Key.FOUR],
  [100, Key.FOUR],
  [53, Key.FIVE],
  [101, Key.FIVE],
  [54, Key.SIX],
  [102, Key.SIX],
  [55, Key.SEVEN],
  [103, Key.SEVEN],
  [56, Key.EIGHT],
  [104, Key.EIGHT],
  [57, Key.NINE],
  [105, Key.NINE],
  [190, Key.DECIMAL],
  [110, Key.DECIMAL],
  [107, Key.ADD],
  [109, Key.SUBTRACT],
  [189, Key.SUBTRACT],
  [106, Key.MULTIPLY],
  [111, Key.DIVIDE],
  [191, Key.DIVIDE],
  [13, Key.CALC],
  [187, Key.CALC],
  [8, Key.ALL_CANCEL],
  [27, Key.ALL_CANCEL],
]);

const keyCodeMapWithShift = new Map([
  [56, Key.MULTIPLY],
  [187, Key.ADD]
]);

export { numKeys, opKeys, fnKeys, allKeys, keyCodeMap, keyCodeMapWithShift };
