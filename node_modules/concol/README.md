# ConCol

A simple but flexible Node.js formatted color logger with no dependencies.

By default, time is shown in 24-hour HH:MM:SS.mmm and numbers are shown in #,### format.


## Installation

```sh
npm install ConCol
```

## Usage

```javascript
import { ConCol } from 'ConCol';

// create logger instances
const log1 = new ConCol('App One', 'cyan');
const log2 = new ConCol('App Two', 'green');
const log3 = new ConCol('App Three 0123456789', 'white', 3);

// basic logging
log1.log('output single string');
log1.info('output string\nwith carriage returns');
log1.warn('show warning');
log1.error('show error');

/* output
12:30:07.030 App One       ┃ output a single string
10:54:34.645 App One       ┃ output string
10:54:34.645 App One       ┃ with carriage returns
10:54:34.646 App One       ┃  WARN: show warning
10:54:34.646 App One       ┃ ERROR: show error
*/

// name/value/unit
log2.log(['ConCol requires', 0, ' modules']);
log2.log([ 'fibonacci sequence', ['first', 1], ['second', 1], ['third', 2] ]);

/* output
10:54:34.697 App Two       ┃                ConCol requires:        0 modules
10:54:34.697 App Two       ┃ output the fibonacci sequence
10:54:34.697 App Two       ┃                          first:        1
10:54:34.697 App Two       ┃                         second:        1
10:54:34.697 App Two       ┃                          third:        2
*/

// log level filtering
log3.info('level0', 0);
log3.info('level3', 3);
log3.info('level4', 4); // not shown - log level set to 3

/* output
10:54:34.748 App Three 0123┃ level0
10:54:34.748 App Three 0123┃ level3
*/
```


## API

### `new ConCol(appName, color, levelShow)`

Creates a new logger instance.

* `appName` (string): the application/namespace name (optional)
* `color` (string): base text color: black, red, green, yellow, blue, magenta, cyan, white, gray (default: white)
* `levelShow` (number): the maximum log level to output, so 0 is silent/important only (default: Infinity - shows everything)

The following methods are available.


### `log(msg, level)`

Outputs `console.log()` messages.

* `msg` (undefined|string|Array): the message (optional)
* `level` (string|Array): message logging level (default 0)

The `msg` can be any of:

* a string
* a string with carriage returns (outputs to separate lines)
* a `[name, value, unit]` array, e.g. `['errors', 0, ' found']`
* an array containing strings or `[name, value, unit]` arrays


### `info(msg, level)`

Outputs `console.info()` messages. Parameters are identical to [`log()`](#logmsg-level).


### `warn(msg, level)`

Outputs `console.warn()` messages prefixed with "WARN:". Parameters are identical to [`log()`](#logmsg-level).


### `error(msg, level)`

Outputs `console.error()` messages prefixed with "ERROR:". Parameters are identical to [`log()`](#logmsg-level).


## Advanced configuration

The following static properties configure log layout:

* `ConCol.appSize = <num>` - the width of the appName column (default 14)
* `ConCol.nameSize = <num>` - the width of a name column (30)
* `ConCol.valueSize = <num>` - the width of a value column (10)
* `ConCol.numFormat = <Intl.NumberFormat>` - numeric value object (`#,###` rounded to 0dp)
* `ConCol.timeFormat = <Intl.DateTimeFormat>` - date/time object (`HH:MM:SS.mmm`)

```js
// example
ConCol.appSize = 7;
ConCol.nameSize = 15;
ConCol.valueSize = 10;

// show values in #,###.## format
ConCol.numFormat = new Intl.NumberFormat(
  'en-US',
  { minimumFractionDigits: 2, maximumFractionDigits: 2 }
);

// show dates in DD/MM HH:MM:SS format
ConCol.timeFormat = new Intl.DateTimeFormat(
  'af-AF',
  {
    month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  }
);

const cc = new ConCol('App One', 'yellow');

cc.log([ 'number two', 12345.678 ]);
cc.log([ 'number one', 123 ]);

/* output
05-06 13:18:20 App One┃      number two:  12,345.68
05-06 13:18:20 App One┃      number one:     123.00
*/
```
