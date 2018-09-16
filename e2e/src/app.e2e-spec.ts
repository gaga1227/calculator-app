import { AppPage } from './app.po';
import { by, protractor } from 'protractor';
import { Key } from '../../src/app/models/key.enum';
import { MathService } from '../../src/app/services/math.service';

describe('Calculator App', () => {
  let app: AppPage;

  beforeEach(() => {
    app = new AppPage();
    app.navigateTo();
  });


  // Basic business scenario test

  it('should display result for a basic calculation', () => {
    // when enter a number
    app.clickKeypad(Key.THREE); // 3
    app.clickKeypad(Key.DECIMAL); // 3.
    app.clickKeypad(Key.TWO); // 3.2

    // and enter an operation
    app.clickKeypad(Key.ADD);

    // and enter a number
    app.clickKeypad(Key.SUBTRACT); // -
    app.clickKeypad(Key.ONE); // -1
    app.clickKeypad(Key.DECIMAL); // -1.
    app.clickKeypad(Key.TWO); // -1.2

    // and choose to display the answer
    app.clickKeypad(Key.CALC);

    // Then The result will be displayed in the browser
    expect(app.getWindowDisplayText()).toBe('2');
  });


  // Detailed tests for specific functionality

  it('should display full calculator UI', () => {
    // app container
    expect(app.isElementDisplayed(by.css('.app'))).toBe(true);
    // display window
    expect(app.isElementDisplayed(by.css('.app__display-window'))).toBe(true);
    // left keypad buttons
    expect(app.isElementDisplayed(by.css('.app__keypad-group--left'))).toBe(true);
    expect(app.findLeftKeypadButtons().count()).toBe(12);
    // right keypad buttons
    expect(app.isElementDisplayed(by.css('.app__keypad-group--right'))).toBe(true);
    expect(app.findRightKeypadButtons().count()).toBe(5);
  });

  describe('should display window', () => {
    it('show calculation expression from UI entries', () => {
      // perform UI entries
      app.clickKeypad(Key.ONE);
      app.clickKeypad(Key.ADD);
      app.clickKeypad(Key.TWO);

      // verify UI
      expect(app.getWindowDisplayText()).toBe('1 + 2');
    });

    it('show calculation result from expression after calculate', () => {
      // perform UI entries
      app.clickKeypad(Key.ZERO);
      app.clickKeypad(Key.DECIMAL);
      app.clickKeypad(Key.FIVE);
      app.clickKeypad(Key.ADD);
      app.clickKeypad(Key.EIGHT);
      app.clickKeypad(Key.MULTIPLY);
      app.clickKeypad(Key.SEVEN);

      // verify expression
      expect(app.getWindowDisplayText()).toBe('0.5 + 8 * 7');

      // calculate
      app.clickKeypad(Key.CALC);

      // verify result
      expect(app.getWindowDisplayText()).toBe('56.5');
    });

    it('show \'Bad Expression\' on invalid calculation expression', () => {
      // perform UI entries
      app.clickKeypad(Key.ONE);
      app.clickKeypad(Key.TWO);
      app.clickKeypad(Key.ADD);

      // verify expression
      expect(app.getWindowDisplayText()).toContain('12 +');

      // calculate
      app.clickKeypad(Key.CALC);

      // verify result
      expect(app.getWindowDisplayText()).toBe(MathService.BAD_EXP_STR);
    });
  });

  describe('should \'All Cancel\' button', () => {
    it('clear calculation expression from display', () => {
      // perform UI entries
      app.clickKeypad(Key.ONE);
      app.clickKeypad(Key.ADD);
      app.clickKeypad(Key.TWO);

      // verify expression
      expect(app.getWindowDisplayText()).toBe('1 + 2');

      // cancel
      app.clickKeypad(Key.ALL_CANCEL);

      // verify result
      expect(app.getWindowDisplayText()).toBe('');
    });

    it('clear calculation results from display', () => {
      // perform UI entries
      app.clickKeypad(Key.TWO);
      app.clickKeypad(Key.DIVIDE);
      app.clickKeypad(Key.ONE);

      // verify expression
      expect(app.getWindowDisplayText()).toBe('2 / 1');

      // calculate
      app.clickKeypad(Key.CALC);

      // verify result
      expect(app.getWindowDisplayText()).toBe('2');

      // cancel
      app.clickKeypad(Key.ALL_CANCEL);

      // verify result
      expect(app.getWindowDisplayText()).toBe('');
    });
  });

  it('should support keyboard events', () => {
    // perform keyboard entries
    app.keyIn('2');
    app.keyIn(protractor.Key.DECIMAL);
    app.keyIn('1');
    app.keyIn(protractor.Key.ADD);
    app.keyIn('1');

    // verify expression
    expect(app.getWindowDisplayText()).toBe('2.1 + 1');

    // calculate
    app.keyIn(protractor.Key.ENTER);

    // verify result
    expect(app.getWindowDisplayText()).toBe('3.1');

    // cancel
    app.keyIn(protractor.Key.ESCAPE);

    // verify result
    expect(app.getWindowDisplayText()).toBe('');
  });
});
