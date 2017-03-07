const fs = require("fs")
const path = require("path")
const {getDateDifference} = require("./date")
const {DATE_DELIMITER, FILE_ENCODING, INPUT_FILE_NAME} = require("./constants")

/**
 * Splits the start date and the end date
 */
const splitDates = dates => {
    const [startDate, endDate] = dates.trim().split(DATE_DELIMITER).map(date => date.trim())
    return {startDate, endDate}
}

/**
 * Fetches the dates from the command line
 */
const fetchDatesFromCommandLine = args => {
    const [,,dates] = args

    if(dates != null) {
        return dates
    } else {
        return null
    }
}

/**
 * Fetches the dates from the input file
 */
const fetchDatesFromFile = filePath => new Promise((resolve, reject) => {
    fs.readFile(filePath, FILE_ENCODING, (error, data) => {
        if(error) {
            reject(error)
        } else {
            resolve(data)
        }
    })
})

/**
 * Fetches the dates. It will initially fetch the dates from the command line. If no
 * dates passes in the command line, then it will fetch the dates from the input file.
 */
const fetchDates = () => {
    const commandLineDates = fetchDatesFromCommandLine(process.argv)

    if(commandLineDates != null) {
        return Promise.resolve(commandLineDates)
    } else {
        const filePath = path.join(path.dirname(__dirname), INPUT_FILE_NAME)
        return fetchDatesFromFile(filePath)
    }
}

fetchDates()
    .then(dates => {
        const {startDate, endDate} = splitDates(dates)
        console.log(`${startDate}, ${endDate}, ${getDateDifference(startDate, endDate)}`)
    })
    .catch(error => {
        console.error(error)
    })