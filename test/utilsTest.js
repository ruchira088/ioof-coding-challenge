const {assert} = require("chai")
const {getDateDifference} = require("../app/index")
const {testing: {isLeapYear, getMonthDays, validateDateString}} = require("../app/utils")

describe("Testing app/utils.js", () => {
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
})

describe("Testing app/index.js", () => {
    describe("getDateDifference(start, end)", () => {
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
})