const {assert} = require("chai")
const {testing, getDateDifference} = require("../app/date")
const {COMPARATOR_ASSERTIONS, ERROR_ASSERTIONS} = require("./constants")

const {
    isLeapYear,
    getMonthDays,
    validateDateString,
    compareDates,
    convertStringToDateObject,
    addDay
} = testing

describe("Testing the helper functions in app/date.js", () => {
    describe("isLeapYear(year)", () => {
        const TEST_VALUES = [
            {year: 1900, isLeap: false},
            {year: 2000, isLeap: true},
            {year: 2010, isLeap: false},
            {year: 2008, isLeap: true},
            {year: 1988, isLeap: true}
        ]

        TEST_VALUES.forEach(({year, isLeap}) => {
            it(`${year} is a ${isLeap ? "" : "non-"}leap year`, () => {
                assert.equal(isLeapYear(year), isLeap)
            })
        })
    })

    describe("getMonthDays(month, year)", () => {
        const TEST_VALUES = [
            {month: 1, year: 2000, days: 31},
            {month: 2, year: 2000, days: 29},
            {month: 2, year: 2001, days: 28},
            {month: 2, year: 1900, days: 28},
            {month: 4, year: 1988, days: 30}
        ]

        TEST_VALUES.forEach(({month, year, days}) => {
            it(`${month} ${year} has ${days} days`, () => {
                assert.equal(getMonthDays(month, year), days)
            })
        })
    })

    describe("validateDateString(dateString)", () => {
        const TEST_VALUES = [
            {dateString: "13 13 2000", isValid: false},
            {dateString: "13 12 2000", isValid: true},
            {dateString: "29 02 2000", isValid: true},
            {dateString: "29 02 2010", isValid: false},
            {dateString: "32 12 2000", isValid: false}
        ]

        TEST_VALUES.forEach(({dateString, isValid}) => {
            it(`${dateString} is ${isValid ? "" : "NOT "}a valid date string`, () => {
                assert.equal(validateDateString(dateString), isValid)
            })
        })
    })

    describe("compareDates(date_1, date_2)", () => {
        const TEST_VALUES = [
            {date_1: "01 01 2000", date_2: "01 01 2000", assertion: COMPARATOR_ASSERTIONS.EQUAL},
            {date_1: "02 01 2000", date_2: "01 01 2000", assertion: COMPARATOR_ASSERTIONS.GREATER_THAN},
            {date_1: "01 01 2000", date_2: "01 02 2000", assertion: COMPARATOR_ASSERTIONS.LESS_THAN},
            {date_1: "01 01 1999", date_2: "01 01 1900", assertion: COMPARATOR_ASSERTIONS.GREATER_THAN},
        ]

        TEST_VALUES
            .map(dates => Object.assign({}, dates, {
                dateObject_1: convertStringToDateObject(dates.date_1),
                dateObject_2: convertStringToDateObject(dates.date_2)
            }))
            .forEach(dates => {
                const {date_1, dateObject_1, date_2, dateObject_2, assertion: {label, assertFunctionName}} = dates

                it(`${date_1} ${label} ${date_2}`, () => {
                    assert[assertFunctionName](compareDates(dateObject_1, dateObject_2), 0)
                })
        })
    })

    describe("addDay(date)", () => {
        const TEST_VALUES = [
            {date: "01 01 2000", result: "02 01 2000"},
            {date: "31 12 1999", result: "01 01 2000"},
            {date: "28 02 2004", result: "29 02 2004"},
            {date: "28 02 2010", result: "01 03 2010"},
            {date: "31 01 2009", result: "01 02 2009"}
        ]

        TEST_VALUES
            .map(entry => Object.assign({}, entry, {
                dateObject: convertStringToDateObject(entry.date),
                resultObject: convertStringToDateObject(entry.result)
            }))
            .forEach(({date, dateObject, result, resultObject}) => {
                it(`Adding a day to ${date} becomes ${result}`, () => {
                    assert.equal(compareDates(addDay(dateObject), resultObject), 0)
                })
            })
    })
})

describe(`Testing the primary function "getDateDifference(start, end)" in app/date.js`, () => {
    const functionName = "getDateDifference(start, end)"

    describe(`${functionName}: check results`, () => {
        const TEST_VALUES = [
            {start: "07 03 2017", end: "26 09 2017", days: 203},
            {start: "26 09 1988", end: "07 03 2017", days: 10389},
            {start: "14 02 1900", end: "07 03 2017", days: 42755},
            {start: "01 01 1948", end: "3 3 1955", days: 2618},
            {start: "3 3 1955", end: "9 6 1957", days: 829},
            {start: "01 01 2000", end: "01 01 2001", days: 366}
        ]

        TEST_VALUES.forEach(({start, end, days}) => {
            it(`${start} - ${end} = ${days} days`, () => {
                assert.equal(getDateDifference(start, end), days)
            })
        })
    })

    describe(`${functionName}: input validations`, () => {
        const TEST_VALUES = [
            {start: "", end: "", error: true},
            {start: "01 01 2000", end: "01 01 2000", error: false},
            {start: "01 02 2000", end: "01 01 2000", error: true},
            {start: "01 02 2000", end: "12 12 1901", error: true},
            {start: "01 13 2000", end: "01 01 2000", error: true},
            {start: "01 2000", end: "01 01 2000", error: true},
            {start: "2000", end: "12 12 1901", error: true},
            {start: "01 13 2000", end: "01 01", error: true},
            {start: "01 02 2000", end: "32 12 1901", error: true}
        ]

        TEST_VALUES.forEach(({start, end, error}) => {
            it(`start: "${start}" end: "${end}" does${error ? "" : " NOT"} throw an error`, () => {
                const assertionFunction = error ?
                    ERROR_ASSERTIONS.DOES_THROW_ERROR
                    :
                    ERROR_ASSERTIONS.DOES_NOT_THROW_ERROR

                assert[assertionFunction](() => getDateDifference(start, end), Error)
            })
        })
    })
})