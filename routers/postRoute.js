const router = require('express').Router()
const postController = require('../controllers/postController')
const {
    auth
} = require('../middleware/auth')
const validationFunction = require('../middleware/validationFun')
const postAPI = require('../roles/postRole')

const {
    multerFn,
    validationType,
    multerHandelErrors
} = require('../service/multer')
const {
    addPostValidation,
    LikePostValidation
} = require('../validation/postValidation')

router.post('/addPost', auth(postAPI.addPost), validationFunction(addPostValidation), multerFn('posts', validationType.image).array('images', 5), multerHandelErrors, postController.createPost)
router.put('/:id/like_unlike', auth(postAPI.addPost), validationFunction(LikePostValidation), postController.like_UnlikePost)
// router.put('/:id/like', auth(postAPI.addPost), validationFunction(LikePostValidation), postController.likePost)
// router.put('/:id/unlike', auth(postAPI.addPost), validationFunction(LikePostValidation), postController.UnlikePost)

router.get('/',postController.getPosts)

module.exports = router;