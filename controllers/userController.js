const User = require('../models/user');
const bcrypt = require('bcryptjs')
const QRCode = require('qrcode')


exports.getProfile = async (req, res) => {
    const userData = await User.findOne({
        _id: req.user._id
    })
    if (userData) {
        res.json({
            message: 'your profile',
            userData
        })
    } else {
        res.json({
            message: "you don't have profile"
        })
    }
}

exports.uploadProfile = async (req, res) => {
    const {
        id
    } = req.user;

    if (req.fileUploadError) {
        res.json({
            message: 'invalid file, accepted files->(png,jpg,jpeg)'
        })
    } else {
        const Url = `${req.protocol}://${req.headers.host}/${req.destination}/${req.file.filename}`
        const updated = await User.findByIdAndUpdate({
            _id: id
        }, {
            profilePic: Url
        }, {
            new: true
        })
        if (updated) {
            res.json({
                message: "your profile picture updated successfully",
                updated
            })
        } else {
            res.json({
                message: "sorry , try again"
            })
        }
    }
}

exports.CoverPictures = async (req, res) => {
    try {
        if (req.fileUploadError) {
            res.json({
                message: 'invalid file'
            })
        } else {
            let uploadedImages = []
            for (let i = 0; i < req.files.length; i++) {
                const Url = `${req.protocol}://${req.headers.host}/${req.destination}/${req.files[i].filename}`
                uploadedImages.push(Url)
            }

            const updated = await User.findByIdAndUpdate({
                _id: req.user._id
            }, {
                coverPics: uploadedImages
            }, {
                new: true
            })
            if (updated) {
                res.json({
                    message: "your profile picture updated successfully",
                    updated
                })
            } else {
                res.json({
                    message: "sorry , try again"
                })
            }
        }
    } catch (error) {
        res.json({
            message: error
        })
    }

}

exports.uploadPDF = async (req, res) => {
    const {
        id
    } = req.user;

    if (req.fileUploadError) {
        res.json({
            message: 'invalid file, accepted files->(pdf only)'
        })
    } else {
        const Url = `${req.protocol}://${req.headers.host}/${req.destination}/${req.file.filename}`
        const updated = await User.findByIdAndUpdate({
            _id: id
        }, {
            pdf: Url
        }, {
            new: true
        })
        if (updated) {
            res.json({
                message: "pdf updated successfully",
                updated
            })
        } else {
            res.json({
                message: "sorry , try again"
            })
        }
    }
}

exports.updatePassword = async (req, res) => {
    const {
        oldPassword,
        newPassword
    } = req.body;
    if (newPassword == oldPassword) {
        res.status(400).json({
            message: "new password can't equal old password"
        })
    } else {
        const foundedUser = await User.findById(req.user._id);
        if (foundedUser) {
            const matchPassword = bcrypt.compareSync(oldPassword, foundedUser.password);
            if (matchPassword) {
                const hash = bcrypt.hashSync(newPassword, parseInt(process.env.saltRounds));
                await User.findByIdAndUpdate({
                    _id: foundedUser._id
                }, {
                    password: hash
                }, {
                    new: true
                })
                res.json({
                    message: 'password updated successfully'
                })
            } else {
                res.status(422).json({
                    message: "your old password is not correct"
                })
            }
        }
    }
}

exports.qrCode = async (req, res) => {
    const user = await User.findById(req.user._id).select('userName email -_id');
    QRCode.toDataURL(`${req.protocol}://${req.headers.host}/user/AllDetails`, function (err, url) {
        if (err) {
            res.status(400).json({
                message: 'QR Code error',
                err
            })
        } else {
            res.json({
                message: 'Done',
                url
            })
        }
    })
}