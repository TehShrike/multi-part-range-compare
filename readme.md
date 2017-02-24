Given a multi-part range (think day/hour/minute or chapter/verse), check to see if a value is within the range.

<!--js
const withinRange = require('./')
-->

```js
const rangeStart = [10, 21]
const rangeEnd = [12, 2]

withinRange(rangeStart, rangeEnd, [ 10, 7 ]) // => false
withinRange(rangeStart, rangeEnd, [ 10, 25 ]) // => true
withinRange(rangeStart, rangeEnd, [ 12, 2 ]) // => true
withinRange(rangeStart, rangeEnd, [ 12, 5 ]) // => false
```

Ranges can have as many parts as you need.

```js
const day = 4
const hour = 12
const minute = 55

withinRange([ 4, 0, 0 ], [ 5, 0, 0 ], [ day, hour, minute ]) // => true
```

## `withinRange(rangeStart, rangeEnd, value)`

All arguments must be arrays of integers, all with the same number of elements.

Returns true or false.

Comparisons are inclusive.

## `withinRange.relative(rangeStart, rangeEnd, value)`

Reminiscent of the [`Array.prototype.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) parameter.

Returns -1 if `value` is less than `rangeStart`.

Returns 1 if `value` is greater than `rangeEnd`.

Returns 0 if `value` is within the range.

```js
withinRange.relative([1, 0], [2, 0], [0, 5]) // => withinRange.LESS_THAN_START
withinRange.relative([1, 0], [2, 0], [1, 4]) // => withinRange.WITHIN
withinRange.relative([1, 0], [2, 0], [2, 1]) // => withinRange.GREATER_THAN_END
```

## `withinRange.LESS_THAN_START`

`-1`

## `withinRange.WITHIN`

`0`

## `withinRange.GREATER_THAN_END`

`1`

# License

[WTFPL](http://wtfpl2.com)
