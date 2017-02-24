const test = require('tape')
const withinRange = require('./')

const lessThan = [
	[ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 1, 2, 0 ] ],
	[ [ 2, 3 ], [ 3, 4 ], [ 1, 2 ] ],
	[ [ 3 ], [ 5 ], [ 2 ] ],
	[ [ 10, 21 ], [ 12, 2 ], [ 10, 7 ] ]
]

const within = [
	[ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 1, 2, 5 ] ],
	[ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 2, 1, 5 ] ],
	[ [ 2, 3 ], [ 3, 4 ], [ 2, 99 ] ],
	[ [ 2, 3 ], [ 3, 4 ], [ 3, 4 ] ],
	[ [ 3 ], [ 5 ], [ 4 ] ]
]

const greaterThan = [
	[ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 2, 3, 5 ] ],
	[ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 0, 0 ] ],
	[ [ 2, 3 ], [ 3, 4 ], [ 99, 0 ] ],
	[ [ 2, 3 ], [ 3, 4 ], [ 3, 5 ] ],
	[ [ 2, 3 ], [ 3, 4 ], [ 4, 0 ] ],
	[ [ 3 ], [ 5 ], [ 6 ] ]
]

test(`Range checks: boolean`, t => {
	greaterThan.concat(lessThan).forEach(([ rangeStart, rangeEnd, value ]) => {
		t.equal(withinRange(rangeStart, rangeEnd, value), false, `${value} should not be in the range`)
	})
	within.forEach(([ rangeStart, rangeEnd, value ]) => {
		t.equal(withinRange(rangeStart, rangeEnd, value), true, `${value} should be in the range`)
	})

	t.end()
})

test(`Range checks: integer`, t => {
	lessThan.forEach(([ rangeStart, rangeEnd, value ]) => {
		t.equal(withinRange.relative(rangeStart, rangeEnd, value), -1, `${value} should be less than the range`)
	})
	within.forEach(([ rangeStart, rangeEnd, value ]) => {
		t.equal(withinRange.relative(rangeStart, rangeEnd, value), 0, `${value} should be within the range`)
	})
	greaterThan.forEach(([ rangeStart, rangeEnd, value ]) => {
		t.equal(withinRange.relative(rangeStart, rangeEnd, value), 1, `${value} should be greater than the range`)
	})

	t.end()
})

test(`Throws if not all values have the same number of parts`, t => {
	t.throws(() => withinRange([ 1 ], [ 1 ], []), /must have/)
	t.throws(() => withinRange([ 1 ], [], [ 1 ]), /must have/)
	t.throws(() => withinRange([], [ 1 ], [ 1 ]), /must have/)
	t.throws(() => withinRange([], [ ], [ ]), /must have/)

	t.end()
})
