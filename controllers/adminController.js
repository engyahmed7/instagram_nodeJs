const Post = require("../models/post")
const User = require("../models/user")
const sendEmail = require("../service/sendEmail")

exports.getAllUser = async (req, res) => {
    const users = await User.find({}).select('userName email')
    if (users) {
        res.status(200).json({
            message: "All Users",
            users
        })
    } else {
        res.status(404).json({
            message: "No users found"
        })
    }
}

exports.getAllPosts = async (req, res) => {
    const posts = await Post.find({}).populate([{
        path: 'Comments'
    }, {
        path: 'likes',
        select: 'userName email'
    }])
    if (posts) {
        res.status(200).json({
            message: "All Posts",
            posts
        })
    } else {
        res.status(404).json({
            message: "No posts found"
        })
    }
}

exports.changeUserRole = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        role
    } = req.body;
    const user = await User.findByIdAndUpdate({
        _id: id
    }, {
        role
    }, {
        new: true
    })
    if (user) {
        sendEmail(user.email, `<h1>Admin change your role to HR</h1>`)
        res.status(200).json({
            message: "role updated",
            user
        })
    } else {
        res.status(404).json({
            message: "user not found"
        })
    }
}

exports.blockUser = async (req, res) => {
    const {
        id
    } = req.params;

    const FoundedUser = await User.find({
        role: {
            $nin: ['admin']
        }
    }).select('_id')
    const IFNotAdmin = FoundedUser.find(user => user._id == id)
    if (IFNotAdmin) {
        const UpdateUser = await User.findByIdAndUpdate({
            _id: id
        }, {
            isBlocked: true
        }, {
            new: true
        })
        if (UpdateUser) {
            sendEmail(UpdateUser.email, `<h1>Admin blocked your account ${UpdateUser.userName}</h1>`)
            res.status(200).json({
                message: "user blocked",
                UpdateUser
            })
        } else {
            res.status(404).json({
                message: "user not found"
            })
        }
    } else {
        res.status(404).json({
            message: "You can't block admin!!!!"
        })

    }

}