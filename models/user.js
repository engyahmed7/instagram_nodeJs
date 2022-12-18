const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    firstName: String,
    lastName: String,
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    profilePic: String,
    coverPics: Array,
    pdf: Array,
    lastSeen: String,
    role: {
        type: String,
        default: "user"
    },
    gender: {
        type: String,
        enums: ["Male", "Female"],
        default: "Male"
    },
    isBlocked: Boolean,
    Following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    online: Boolean,
    shareLink: String,
    code: String,
    socketID: String
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    const hash = bcrypt.hashSync(this.password, parseInt(process.env.saltRounds));
    this.password = hash;
    next();
})

const updatedHooks = ['findOneAndUpdate', 'findOneAndDelete', 'findOneAndRemove', 'findOneAndReplace'];
updatedHooks.forEach((key) => {
    userSchema.pre(key, async function () {
        let data = await this.model.findOne(this.getQuery());
        // console.log(data);
        this.set({
            __v: data.__v + 1
        })
    })
})

module.exports = mongoose.model('User', userSchema)