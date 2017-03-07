const fs = require("fs")
const path = require("path")
const {getDateDifference} = require("./date")
const {DATE_DELIMITER, FILE_ENCODING, INPUT_FILE_NAME} = require("./constants")

const splitDates = dates => {
    const [startDate, endDate] = dates.trim().split(DATE_DELIMITER).map(date => date.trim())
    return {startDate, endDate}
}

const fetchDatesFromCommandLine = args => {
    const [,,dates] = args

    if(dates != null) {
        return splitDates(dates)
    } else {
        return null
    }
}

const fetchDatesFromFile = filePath => new Promise((resolve, reject) => {
    fs.readFile(filePath, FILE_ENCODING, (error, data) => {
        if(error) {
            reject(error)
        } else {
            resolve(data)
        }
    })
})

const fetchDates = () => {
    const commandLineDates = fetchDatesFromCommandLine(process.argv)

    if(commandLineDates != null) {
        return Promise.resolve(commandLineDates)
    } else {
        const filePath = path.join(path.dirname(__dirname), INPUT_FILE_NAME)
        return fetchDatesFromFile(filePath).then(splitDates)
    }
}

fetchDates()
    .then(({startDate, endDate}) => {
        console.log(`${startDate}, ${endDate}, ${getDateDifference(startDate, endDate)}`)
    })
    .catch(error => {
        console.error(error)
    })