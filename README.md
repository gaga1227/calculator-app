# Calculator App

This is an exercise web app project to simulate a calculator. It is generated with [Angular CLI](https://github.com/angular/angular-cli).

## Preview
The calculator app can be [previewed here](http://gaga-graphics.com/calculator-app/dist/calculator-app/).

## How to use

### Input calculation entries
* Use available number keypads (0~9) to enter number inputs
* Use decimal keypad (.) for numbers with floating points
* Use negate/minus keypad (-) for negative numbers
* Use operation keypads (+) (-) (*) (/) for basic operations 

### Get calculation result
* Use equal keypad (=) for calculation results
* Calculating on an expression ending with an operation entry, e.g. *'1 + '*, results in *'BAD EXPRESSION'*


### Clear/reset calculation
* Use all cancel keypad (AC) to clear out calculation expression or result

### Keyboard support
Following basic keyboard keys are supported:
* Number keys
* Negate sign and decimal point keys
* Numeric keypad (numpad) keys
* EQUAL, ENTER keys for calculating result
* ESCAPE, BACKSPACE keys for clearing up calculation expression or result

## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
