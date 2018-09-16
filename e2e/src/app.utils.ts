import { Key } from '../../src/app/models/key.enum';

export class AppUtils {

  static getKeyId(key: Key) {
    return Key.getId(key);
  }
}
