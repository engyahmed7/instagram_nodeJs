const ValidationMethods = ['params', 'body', 'query', 'headers'];
const validationFunction = (schema) => {
    return (req, res, next) => {
        const validationError = []
        ValidationMethods.forEach((key) => {
            if (schema[key]) {
                const validationData = schema[key].validate(req[key], {
                    abortEarly: false
                })
                if (validationData.error) {
                    validationError.push(validationData.error.details)
                }
            }
        });
        if (validationError.length) {
            res.json({
                message: "Validation Error",
                validationError
            })
        } else {
            next()
        }
    }
}

module.exports = validationFunction;