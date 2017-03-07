const {assert} = require("chai")
const {isLeapYear} = require("../app/utils")

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
            it(`${year}`, () => {
                assert.equal(isLeapYear(year), isLeap)
            })
        })
    })
})