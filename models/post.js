const mongoose = require('mongoose')
const postModel = mongoose.Schema({
    text: String,
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
    Comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }],
}, {
    timestamps: true
})
module.exports = mongoose.model('Post', postModel);