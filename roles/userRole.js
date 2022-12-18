const {
    access
} = require("../middleware/auth");

const userAPI = {
    geDetails: [access.Admin, access.User],
    changePicture: [access.User],
}

module.exports = userAPI;