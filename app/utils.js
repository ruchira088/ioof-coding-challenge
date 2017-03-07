const constants = require("./constants")

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
//
// const getDifference = (date_1, date_2, days = 0) => {
//
//     if(areDatesEqual(date_1, date_2)) {
//         return days
//     } else {
//         return getDifference(addDay(date_1), date_2, days+1)
//     }
// }


const getDifference = (date_1, date_2, days = 0) => {
    const {day, month, year} = date_1

    if(areDatesEqual(date_1, date_2)) {
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

const areDatesEqual = ({day, month, year}, date_2) => (
    day == date_2.day && month == date_2.month && year == date_2.year
)

const getMonthDays = (month, year) => {
    const {getDays} = monthDays.find(({months}) => months.includes(month))

    return getDays(isLeapYear(year))
}

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

const isLeapYear = year => {
    const isDivisible = number => divisor => number % divisor == 0
    const isYearDivisible = isDivisible(year)

    return (isYearDivisible(4) && !isYearDivisible(100)) || (isYearDivisible(year, 100) && isYearDivisible(400))
}

const splitDateString = dateString => dateString.trim().split(" ")

const convertStringToDateObject = dateString => {
    if(validateDateString(dateString)) {
        const [day, month, year] = splitDateString(dateString)

        return {day: parseInt(day), month: parseInt(month), year: parseInt(year)}
    }

    throw new Error(`${dateString} does NOT conform to the accepted date format DD MM YYYY`)
}

const validateDateString = dateString => {
    const dateValueArray = splitDateString(dateString)

    if(dateValueArray.length == 3) {
        const [day, month, year] = dateValueArray

        const isValidDay = inputDay => (inputDay >= constants.MIN_DAY && inputDay <= constants.MAX_DAY)
        const isValidMonth = inputMonth => (inputMonth >= constants.MIN_MONTH && inputMonth <= constants.MAX_MONTH)
        const isValidYear = inputYear => inputYear >= constants.MIN_YEAR

        return isValidDay(day) && isValidMonth(month) && isValidYear(year)
    }

    return false
}

module.exports = {
    isLeapYear,
    convertStringToDateObject,
    getDifference
}