const utils = require("./utils")

const getDateDifference = (start, end) => {
    const startDate = utils.convertStringToDateObject(start)
    const endDate = utils.convertStringToDateObject(end)

    return utils.getDifference(startDate, endDate)
}

// getDateDifference("1 1 2000", "1 1 2010")

module.exports = {
    getDateDifference
}