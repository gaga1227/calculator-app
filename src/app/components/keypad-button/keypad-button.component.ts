import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Key } from '../../models/key.enum';

@Component({
  selector: 'app-keypad-button',
  templateUrl: './keypad-button.component.html',
  styleUrls: ['./keypad-button.component.css']
})
export class KeypadButtonComponent implements OnInit, OnChanges {

  @Input() key: Key;
  @Input() keyboardKeyDown: Key|null = null;
  @Output() keypadClick: EventEmitter<Key> = new EventEmitter();

  keyButtonId: string = null;
  keyButtonDisplayText = ''; // keypad button label text
  isMappedKeyboardKeyDown = false; // keypad button pressed down state

  constructor() {
  }

  ngOnInit() {
    this.keyButtonId = `appKeypadBtn${Key.getId(this.key)}`;
    this.keyButtonDisplayText = Key.getDisplayText(this.key);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isMappedKeyboardKeyDown = this.keyboardKeyDown === this.key;
  }

  /**
   * onClick - handler for component button element click event
   *
   * @returns {void}
   */
  onClick() {
    console.log('[keypad button]', 'click:', this.key);
    this.keypadClick.emit(this.key);
  }
}
