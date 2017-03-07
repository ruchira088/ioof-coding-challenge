const constants = require("./constants")
const messages = require("./messages")

/**
 * The mappings for the number of days in a month
 */
const monthDays = [
    {
        getDays: () => 31,
        months: constants.THIRTY_ONE_DAY_MONTHS
    },
    {
        getDays: () => 30,
        months: constants.THIRTY_DAY_MONTHS
    },
    {
        getDays: isLeapYear => isLeapYear ? 29 : 28,
        months: [2]
    }
]

/**
 * Returns the number of days between 2 date objects
 */
const getDifference = (date_1, date_2, days = 0) => {
    const {day, month, year} = date_1

    if(compareDates(date_1, date_2) == 0) {
        return days
    } else {
        if(day == 1 && month == 1 && year != date_2.year) {
            const daysInYear = isLeapYear(year) ?
                constants.DAYS_IN_A_LEAP_YEAR
                :
                constants.DAYS_IN_A_NON_LEAP_YEAR

            return getDifference(
                Object.assign({}, date_1, {year: year+1}),
                date_2,
                days + daysInYear
            )
        } else {
            return getDifference(addDay(date_1), date_2, days+1)
        }
    }
}

/**
 * Compares 2 dates and returns one of the following results,
 *   (1) A value greater than zero if date_1 is after date_2
 *   (2) Zero if date_1 and date_2 are the same date
 *   (3) A value less than zero if date_1 is before date_2
 */
const compareDates = (date_1, date_2) => (
    constants.DATE_COMPARE_ORDER.reduce((result, field) => {
        if(result != 0) {
            return result
        } else {
            return date_1[field] - date_2[field]
        }
    }, 0)
)

/**
 * Returns the number of days in a given month
 */
const getMonthDays = (month, year) => {
    const {getDays} = monthDays.find(({months}) => months.includes(month))

    return getDays(isLeapYear(year))
}

/**
 * Returns a date which is incremented by a single day
 */
const addDay = date => {
    const {day, month, year} = date

    const monthDays = getMonthDays(month, year)

    if(monthDays > day) {
        return Object.assign({}, date, {day: day+1})
    } else {
        if(month == 12) {
            return {
                day: 1,
                month: 1,
                year: year+1
            }
        } else {
            return {
                day: 1,
                month: month+1,
                year
            }
        }
    }
}

/**
 * Returns true if the passed in year is a leap year, and false otherwise
 */
const isLeapYear = year => {
    const isDivisible = number => divisor => number % divisor == 0
    const isYearDivisible = isDivisible(year)

    return (isYearDivisible(4) && !isYearDivisible(100)) || (isYearDivisible(year, 100) && isYearDivisible(400))
}

const splitDateString = dateString => dateString.trim().split(" ")

/**
 * Converts a date string into a date object
 */
const convertStringToDateObject = dateString => {
    if(dateString != null && validateDateString(dateString)) {
        const [day, month, year] = splitDateString(dateString).map(Number)

        return {day, month, year}
    }

    throw new Error(`${dateString} ${messages.ERROR.INVALID_DATE}`)
}

/**
 * Validates a date string
 */
const validateDateString = dateString => {
    const dateValueArray = splitDateString(dateString)

    if(dateValueArray.length == 3) {
        const [day, month, year] = dateValueArray.map(Number)

        const isValidDay = (inputDay, inputMonth, inputYear) => (
            inputDay >= constants.MIN_DAY && inputDay <= getMonthDays(inputMonth, inputYear)
        )
        const isValidMonth = inputMonth => (inputMonth >= constants.MIN_MONTH && inputMonth <= constants.MAX_MONTH)
        const isValidYear = inputYear => (inputYear >= constants.MIN_YEAR && inputYear <= constants.MAX_YEAR)

        return isValidMonth(month) && isValidYear(year) && isValidDay(day, month, year)
    }

    return false
}

/**
 * Returns the number of days between 2 date strings. The date strings must
 * have the format of "DD MM YYYY". The start date must be before or equal to
 * the end date.
 */
const getDateDifference = (start, end) => {
    const startDate = convertStringToDateObject(start)
    const endDate = convertStringToDateObject(end)

    if(compareDates(startDate, endDate) > 0) {
        throw new Error(messages.ERROR.END_DATE_BEFORE_START_DATE)
    }

    return getDifference(startDate, endDate)
}

module.exports = {
    getDateDifference,
    testing: {
        addDay,
        isLeapYear,
        getMonthDays,
        validateDateString,
        compareDates,
        convertStringToDateObject
    }
}