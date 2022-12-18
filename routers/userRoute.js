const router = require('express').Router()
const userController = require('../controllers/userController')
const {
    auth
} = require('../middleware/auth')
const validationFunction = require('../middleware/validationFun')
const userAPI = require('../roles/userRole')
const {
    multerFn,
    validationType,
    multerHandelErrors
} = require('../service/multer')
const {
    getDetails
} = require('../validation/userValidation')


router.get('/AllDetails', validationFunction(getDetails), auth(userAPI.geDetails), userController.getProfile);
router.put('/uploadProfilePic', auth(userAPI.changePicture), multerFn('user/profilePic', validationType.image).single('image'), multerHandelErrors, userController.uploadProfile)
router.put('/uploadCoverPics', auth(userAPI.changePicture), multerFn('user/coverPics', validationType.image).array('images', 5), multerHandelErrors, userController.CoverPictures)
router.put('/uploadPDF', auth(userAPI.changePicture), multerFn('user/pdf', validationType.files).single('pdf'), userController.uploadPDF)
router.patch('/editPassword', auth(userAPI.changePicture), userController.updatePassword)
router.get('/qr', auth(userAPI.changePicture), userController.qrCode)

module.exports = router