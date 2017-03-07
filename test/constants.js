module.exports = {
    COMPARATOR_ASSERTIONS: {
        EQUAL: {assertFunctionName: "equal", label: "is equal to"},
        GREATER_THAN: {assertFunctionName: "isAbove", label: "is after"},
        LESS_THAN: {assertFunctionName: "isBelow", label: "is before"}
    },
    ERROR_ASSERTIONS: {
        DOES_THROW_ERROR: "throws",
        DOES_NOT_THROW_ERROR: "doesNotThrow"
    }
}