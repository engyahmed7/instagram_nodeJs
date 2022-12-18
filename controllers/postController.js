const Post = require("../models/post");
const Comment = require("../models/comment");
const {
    getIO
} = require("../service/initSocket");
const user = require("../models/user");

exports.createPost = async (req, res) => {
    const {
        text
    } = req.body;
    if (req.fileUploadError) {
        res.status(400).json({
            message: "invalid file type"
        })
    } else {
        const imageURLS = [];
        for (let i = 0; i < req.files.length; i++) {
            let fileName = `${req.protocol}://${req.headers.host}/${req.destination}/${req.files[i].filename}`
            imageURLS.push(fileName)
        }
        const post = new Post({
            text,
            image: imageURLS,
            createdBy: req.user._id
        })
        const uploadedPost = await post.save();
        if (uploadedPost) {
            // to send to specific user use (to)
            // let recieverUser = await user.findById(req.query.id).select('socketID');
            // getIO().to(recieverUser.socketID).emit('replay', post)

            getIO().emit('replay', post)
            res.status(200).json({
                message: "post uploaded successfully",
                uploadedPost
            })
        } else {
            res.status(400).json({
                message: "failed to add post "
            })
        }
    }
}

exports.like_UnlikePost = async (req, res) => {
    const {
        id
    } = req.params;
    const foundedPost = await Post.findById(id);
    if (foundedPost) {
        if (foundedPost.likes.includes(req.user._id)) {
            await Post.findByIdAndUpdate({
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
            await Post.findByIdAndUpdate({
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
            message: "Post not found"
        })
    }
}

exports.getPosts = async (req, res) => {
    // child-parent relation

    // const cursor = await Post.find({}).cursor();
    // const posts = [];
    // for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    //     const comment = await Comment.find({
    //         postId: doc._id
    //     })
    //     posts.push({
    //         doc,
    //         comment
    //     })
    // }

    const posts = await Post.find({}).populate([{
            path: 'createdBy',
            select: 'userName email'
        },
        {
            path: 'Comments',
            match: {
                isDeleted: false
            },
            populate: [{
                    path: 'replays',
                    select: 'text createdBy likes',
                    populate: [{
                        path: 'likes',
                        select: 'userName email'
                    }],
                },
                {
                    path: 'likes',
                    select: 'userName email'
                }
            ],
            select: 'text replays likes'
        },
        {
            path: 'likes',
            select: 'userName email'
        }
    ]);

    res.json({
        message: "all posts",
        posts
    })
}