const utils = require("./utils")

const getDateDifference = (start, end) => {
    const startDate = utils.convertStringToDateObject(start)
    const endDate = utils.convertStringToDateObject(end)

    console.log(utils.getDifference(startDate, endDate))
}

getDateDifference("1 1 2000", "1 1 2010")
