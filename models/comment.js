const mongoose = require('mongoose')
const commentModel = mongoose.Schema({
    text: String,
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    replays: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }],
    
}, {
    timestamps: true
})
module.exports = mongoose.model('Comment', commentModel)