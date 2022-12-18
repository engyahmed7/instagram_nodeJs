const commentModel = require('../models/comment');
const Post = require('../models/post');

exports.addComment = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        text
    } = req.body;
    const foundedPost = await Post.findById(id);
    if (foundedPost) {
        const comment = new commentModel({
            text,
            createdBy: req.user._id,
            postId: foundedPost._id
        })
        const savedComment = await comment.save()
        const savePost = await Post.findByIdAndUpdate(foundedPost._id, {
            $push: {
                Comments: savedComment._id
            }
        }, {
            new: true
        })
        res.json({
            message: 'comment added successfully',
            savedComment
        })
    } else {
        res.status(404).json({
            message: 'post not found',
        })
    }
}

exports.replayComment = async (req, res) => {
    const {
        postId,
        commentId
    } = req.params;
    const {
        text
    } = req.body;
    const foundedPost = await Post.findById(postId).populate('Comments')
    if (foundedPost) {
        const comment = await commentModel.findOne({
            postId: postId,
            _id: commentId
        })
        if (comment) {
            const newcomment = new commentModel({
                text,
                createdBy: req.user._id,
                postId: foundedPost._id
            })
            const savedComment = await newcomment.save()
            await commentModel.findByIdAndUpdate(comment._id, {
                $push: {
                    replays: savedComment._id
                }
            }, {
                new: true
            })
            res.json({
                message: 'replay added successfully',
            })
        } else {
            res.ststus(400).json({
                message: 'in-valid comment',
            })
        }
    } else {
        res.status(404).json({
            message: 'post not found',
        })
    }
}


exports.like_UnlikePost = async (req, res) => {
    const {
        id
    } = req.params;
    const foundedPost = await commentModel.findById(id);
    if (foundedPost) {
        if (foundedPost.likes.includes(req.user._id)) {
            await commentModel.findByIdAndUpdate({
                _id: id
            }, {
                $pull: {
                    likes: req.user._id
                }
            }, {
                new: true
            })
            res.status(200).json({
                message: "Unlike Post",
            })
        } else {
            await commentModel.findByIdAndUpdate({
                _id: id
            }, {
                $push: {
                    likes: req.user._id
                }
            }, {
                new: true
            })
            res.status(200).json({
                message: "Like Post"
            })
        }
    } else {
        res.status(400).json({
            message: "comment not found"
        })
    }
}