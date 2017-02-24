
const LESS_THAN = -1
const WITHIN = 0
const GREATER_THAN = 1

function withinRange(rangeStart, rangeEnd, value) {
	return relative(rangeStart, rangeEnd, value) === WITHIN
}

function relative(rangeStart, rangeEnd, value) {
	if (rangeStart.length !== rangeEnd.length || rangeEnd.length !== value.length || rangeStart.length === 0) {
		throw new Error(`All values must have the same positive number of elements`)
	}

	if (compareTwoValues(rangeStart, value) === LESS_THAN) {
		return LESS_THAN
	} else if (compareTwoValues(rangeEnd, value) === GREATER_THAN) {
		return GREATER_THAN
	}

	return WITHIN
}

function compareTwoValues(target, value) {
	// For each value: if value is less than target, LESS_THAN
	// if value is greater than target, GREATER_THAN
	// if value is equal to target, go to the next number

	for (var i = 0; i < target.length; ++i) {
		let currentTarget = target[i]
		let currentValue = value[i]

		if (currentValue < currentTarget) {
			return LESS_THAN
		} else if (currentValue > currentTarget) {
			return GREATER_THAN
		}
	}

	return WITHIN
}

module.exports = withinRange

withinRange.LESS_THAN_START = LESS_THAN
withinRange.WITHIN = WITHIN
withinRange.GREATER_THAN_END = GREATER_THAN

withinRange.relative = relative
