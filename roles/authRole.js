const {
    access
} = require("../middleware/auth");

const authAPI = {
    logout: [access.Admin, access.User]
}

module.exports = authAPI;