const router = require('express').Router()
const commentController = require('../controllers/commentController')
const {
    auth
} = require('../middleware/auth')
const validationFunction = require('../middleware/validationFun')
const postAPI = require('../roles/postRole')
const {
    addCommentValidation
} = require('../validation/commentValidation')
const {
    LikePostValidation
} = require('../validation/postValidation')

router.post('/:id/addComment', auth(postAPI.addPost), validationFunction(addCommentValidation), commentController.addComment)
router.put('/:id/like_unlike', auth(postAPI.addPost), validationFunction(LikePostValidation), commentController.like_UnlikePost)
router.patch('/:postId/replayComment/:commentId', auth(postAPI.addPost), commentController.replayComment)

module.exports = router