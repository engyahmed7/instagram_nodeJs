const router = require('express').Router()
const authController = require('../controllers/authController')
const {
    auth
} = require('../middleware/auth')
const validationFunction = require('../middleware/validationFun')
const authAPI = require('../roles/authRole')
const {
    signUpValidation,
    signInValidation,
    ResetPasswordValidation
} = require('../validation/authValidation')


router.post('/signUp', validationFunction(signUpValidation), authController.signUp)
router.post('/signIn', validationFunction(signInValidation), authController.signIn)
router.post('/signOut', auth(authAPI.logout), authController.signOut)
router.get('/confirm/:token', authController.confirmEmail)
router.get('/reSend/:id', authController.ResendToken)
router.get('/reconfirm/:token', authController.ReconfirmEmail)
router.post('/resetPassword', authController.sendCodeToResetPassword)
router.patch('/forgetPassword', validationFunction(ResetPasswordValidation), authController.ResetPassword)
// 

module.exports = router