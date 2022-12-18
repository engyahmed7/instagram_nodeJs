const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');


const access = {
    Admin: "admin",
    User: "user",
    HR: "hr"
}

const auth = (accessRoles) => {
    return (req, res, next) => {
        console.log(req.headers);
        const authorization = req.headers.authorization;
        // console.log(authorization);
        if (!authorization || authorization == null || authorization == undefined || !authorization.startsWith('Bearer ')) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "you are not authorized",
                ExtraInfo: ReasonPhrases.UNAUTHORIZED
            })
        } else {
            const decodedToken = req.headers.authorization.split(' ')[1];
            jwt.verify(decodedToken, process.env.KEY_JWT, async function (err, decoded) {
                if (decoded) {
                    let userData = await User.findById(decoded.id);
                    if (userData) {
                        if (accessRoles.includes(decoded.role)) {
                            req.user = userData;
                            next()
                        } else {
                            res.status(StatusCodes.FORBIDDEN).json({
                                message: "you are not authorized to get this data",
                                ExtraInfo: ReasonPhrases.FORBIDDEN
                            })
                        }
                    } else {
                        res.status(422).json({
                            message: "User Not Exist"
                        })
                    }
                } else {
                    res.json({
                        message: "invalid token"
                    })
                }
            })
        }
    }
}

module.exports = {
    auth,
    access
};