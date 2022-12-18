const {
    access
} = require("../middleware/auth");

const postAPI = {
    addPost: [access.Admin, access.User]
}

module.exports = postAPI;