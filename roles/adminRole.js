const {
    access
} = require("../middleware/auth");

const adminAPI = {
    getAllUsers: [access.Admin],
    getAllPosts: [access.Admin],
    changeRole: [access.Admin]
}

module.exports = adminAPI;