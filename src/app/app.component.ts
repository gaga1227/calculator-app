import { Component, HostListener, Output } from '@angular/core';
import { Key } from './models/key.enum';
import { EntryManagerService } from './services/entry-manager.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @Output() calcResultDisplay = ''; // calculation result display text
  @Output() calcExpressionDisplay = ''; // calculation expression display text
  @Output() currentKeyboardKeyDown: Key|null = null; // current keyboard key that is pressed down

  isDisplayResult = false; // if calculator is displaying result rather than user entries

  readonly keys = {
    // available number keys in display sequence
    numKeys: [
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
    ],

    // available operation keys in display sequence
    opKeys: [
      Key.DIVIDE,
      Key.MULTIPLY,
      Key.SUBTRACT,
      Key.ADD
    ],

    // available function keys
    calcKey: Key.CALC,
    allCancelKey: Key.ALL_CANCEL
  };

  constructor(private entryManager: EntryManagerService) {
  }

  /**
   * onKeypadSelect - event handler for keypadButton component 'keypadClick' event
   *
   * @param {Key} key
   * @returns {void}
   */
  onKeypadSelect(key: Key) {
    console.log('[app]', 'onKeypadSelect:', key);

    // use entry manager to handle all user entries, calculate result and update display properties
    this.entryManager.handleEntryKey(key);
    this.isDisplayResult = this.entryManager.isDisplayResult;
    this.calcExpressionDisplay = this.entryManager.calcExpression;
    this.calcResultDisplay = this.entryManager.calcResult;
  }

  /**
   * onDocumentKeyEvents - event handler for document's global keyboard events
   *
   * @param {Object} event  original keyboard event object
   * @returns {void}
   */
  @HostListener('document:keydown', ['$event'])
  @HostListener('document:keyup', ['$event'])
  onDocumentKeyEvents(event) {
    // check keyboard event properties
    const keyCode = event.keyCode;
    const shiftKey = event.shiftKey;
    if (isNaN(keyCode) || typeof shiftKey !== 'boolean') {
      return false;
    }

    // check key based on keyboard event properties
    const key: Key|null = Key.getKeyFromKeyCode(keyCode, shiftKey);
    if (key === null) {
      return false;
    }

    console.log('[app]', 'onDocumentKeyEvents:', keyCode, event.type, shiftKey ? 'shift' : '');

    // get event type
    const isKeyDown = event.type === 'keydown';
    const isKeyUp = event.type === 'keyup';

    // emit keyboard events to 'keypadButton' components for UI updates
    // and call keypad select handler
    if (isKeyDown) {
      this.currentKeyboardKeyDown = key;
    } else if (isKeyUp) {
      this.currentKeyboardKeyDown = null;
      this.onKeypadSelect(key);
    }
  }
}
