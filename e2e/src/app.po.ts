import { $, $$, browser, by, element, Locator } from 'protractor';
import { Key } from '../../src/app/models/key.enum';
import { AppUtils } from './app.utils';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  isElementPresent(locator: Locator) {
    return element(locator).isPresent();
  }

  isElementDisplayed(locator: Locator) {
    return element(locator).isDisplayed();
  }

  findLeftKeypadButtons() {
    return $$('.app__keypad-group--left .app__keypad-btn');
  }

  findRightKeypadButtons() {
    return $$('.app__keypad-group--right .app__keypad-btn');
  }

  clickKeypad(key: Key) {
    $(`#appKeypadBtn${AppUtils.getKeyId(key)}`).click();
  }

  keyIn(key: any) {
    element(by.tagName('body')).sendKeys(key);
  }

  getWindowDisplayText() {
    return $('.app__display-window').getText();
  }
}
