const router = require('express').Router()
const adminController = require('../controllers/adminController')
const {
    auth
} = require('../middleware/auth')
const adminAPI = require('../roles/adminRole')


router.get('/AllUsers', auth(adminAPI.getAllUsers), adminController.getAllUser)
router.get('/AllPosts', auth(adminAPI.getAllPosts), adminController.getAllPosts)
router.patch('/:id/changeRole', auth(adminAPI.changeRole), adminController.changeUserRole)
router.patch('/:id/blockUser', auth(adminAPI.changeRole), adminController.blockUser)

module.exports = router