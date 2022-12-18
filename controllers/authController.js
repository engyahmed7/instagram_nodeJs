const User = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const sendEmail = require("../service/sendEmail");

exports.signUp = async (req, res) => {
    try {
        const {
            userName,
            email,
            password,
            age
        } = req.body;

        let user = new User({
            userName,
            email,
            password,
            age
        })
        const addedUser = await user.save();
        const token = jwt.sign({
            id: addedUser._id
        }, process.env.KEY_JWT, {
            expiresIn: 60
        })

        let URL = `${req.protocol}://${req.headers.host}/auth/confirm/${token}`
        let URL2 = `${req.protocol}://${req.headers.host}/auth/reSend/${addedUser._id}`
        await sendEmail(email, `<h3><a href=${URL}>please click here to verify your account</a></h3> <br> <a href=${URL2}>Re-send Token</a>`)
        res.json({
            message: 'user Added succesffully',
            addedUser
        })
    } catch (error) {
        if (error.keyValue && error.keyValue.email) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                message: "user already exist",
                error
            })
        } else {
            res.status(404).json({
                message: "invalid email",
                error
            })
        }
    }
}

exports.signIn = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const foundedUser = await User.findOne({
        email
    })
    if (foundedUser) {
        if (foundedUser.isConfirmed) {
            if (!foundedUser.isBlocked) {
                const matched = bcrypt.compare(password, foundedUser.password)
                if (matched) {
                    const token = jwt.sign({
                        id: foundedUser._id,
                        userName: foundedUser.userName,
                        email: foundedUser.email,
                        isLoggin: true,
                        role: foundedUser.role
                    }, process.env.KEY_JWT);
                    await User.findByIdAndUpdate({
                        _id: foundedUser._id
                    }, {
                        online: true,
                        lastSeen: ''
                    }, {
                        new: true
                    })
                    res.json({
                        message: `welcome ${foundedUser.userName}`,
                        token
                    })
                } else {
                    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                        message: "wrong password"
                    })
                }

            } else {
                res.status(400).json({
                    message: 'sorry you are blocked by admin'
                })
            }
        } else {
            res.status(400).json({
                message: 'you have to verify your email first'
            })
        }
    } else {
        res.status(StatusCodes.NOT_FOUND).json({
            message: "invalid email, please register first"
        })
    }

}

exports.signOut = async (req, res) => {
    const d = new Date();
    let minutes = d.getMinutes();
    await User.findOneAndUpdate({
        _id: req.user._id
    }, {
        lastSeen: `${minutes} min`,
        online: false
    })
    res.json({
        message: 'LoggedOut'
    })
}

exports.confirmEmail = async (req, res) => {
    try {
        const {
            token
        } = req.params;
        console.log(token);
        if (token == undefined || token == null || !token) {
            res.status(404).json({
                message: "you should hava a token"
            })
        } else {
            let decoded = jwt.verify(token, process.env.KEY_JWT)
            if (decoded) {
                let {
                    id
                } = decoded;
                let foundedUser = await User.findById(id);
                if (foundedUser) {
                    if (foundedUser.isConfirmed) {
                        res.status(400).json({
                            message: "email already confirmed"
                        })
                    } else {
                        let updateUser = await User.findByIdAndUpdate(foundedUser._id, {
                            isConfirmed: true
                        }, {
                            new: true
                        })
                        res.status(200).json({
                            message: "Done! email confirmed, Please Login ",
                            updateUser
                        })
                    }
                } else {
                    res.status(403).json({
                        message: "invalid email"
                    })
                }
            } else {
                res.status(403).json({
                    message: "invalid token"
                })
            }
        }
    } catch (error) {
        res.status(403).json({
            message: "invalid token",
            error
        })
    }
}

exports.ResendToken = async (req, res) => {
    const {
        id
    } = req.params;
    const foundedUser = await User.findById(id);
    if (foundedUser) {
        if (!foundedUser.isConfirmed) {
            const token = jwt.sign({
                id: foundedUser._id
            }, process.env.KEY_JWT)
            const URL = `${req.protocol}://${req.headers.host}/auth/reconfirm/${token}`
            sendEmail(foundedUser.email, `<h3><a href=${URL}>please click here to Re-verify your account</a></h3>`)
            res.json({
                message: 'please check your email now',
            })
        } else {
            res.status(409).json({
                message: 'Your account is already verified'
            })
        }
    } else {
        res.status(400).json({
            message: 'user not found'
        })
    }

}

exports.ReconfirmEmail = async (req, res) => {
    try {
        const {
            token
        } = req.params;
        console.log(token);
        if (token == undefined || token == null || !token) {
            res.status(404).json({
                message: "you should hava a token"
            })
        } else {
            let decoded = jwt.verify(token, process.env.KEY_JWT)
            if (decoded) {
                let {
                    id
                } = decoded;
                let foundedUser = await User.findById(id);
                if (foundedUser) {
                    if (foundedUser.isConfirmed) {
                        res.status(400).json({
                            message: "email already confirmed"
                        })
                    } else {
                        let updateUser = await User.findByIdAndUpdate(foundedUser._id, {
                            isConfirmed: true
                        }, {
                            new: true
                        })
                        res.status(200).json({
                            message: "Done! email confirmed, Please Login ",
                            updateUser
                        })
                    }
                } else {
                    res.status(403).json({
                        message: "invalid email"
                    })
                }
            } else {
                res.status(403).json({
                    message: "invalid token"
                })
            }
        }
    } catch (error) {
        res.status(403).json({
            message: "invalid token",
            error
        })
    }
}

exports.sendCodeToResetPassword = async (req, res) => {
    const {
        email
    } = req.body;

    const foundedUser = await User.findOne({
        email: email
    })
    if (foundedUser) {
        const code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
        await User.findByIdAndUpdate({
            _id: foundedUser._id
        }, {
            code
        }, {
            new: true
        })
        const message = `<h3>Use this code to reset password: ${code}`;
        // const URL = `${req.protocol}://${req.headers.host}/auth/resetPassword/${token}`
        sendEmail(email, message)
        res.json({
            message: 'please check your email now.',
        })
    } else {
        res.status(404).json({
            message: 'email is not found, please enter a valid email'
        })
    }
}

exports.ResetPassword = async (req, res) => {
    const {
        code,
        newPassword
    } = req.body;

    const FoundedUser = await User.findOne({
        code
    })
    if (!FoundedUser) {
        res.status(404).json({
            message: "invalid code"
        })
    } else {
        const hash = bcrypt.hashSync(newPassword, parseInt(process.env.saltRounds));
        const updatePassword = await User.findByIdAndUpdate({
            _id: FoundedUser._id
        }, {
            password: hash,
            code: ''
        }, {
            new: true
        })
        res.json({
            message: 'password updated successfully',
            updatePassword
        })
    }
}