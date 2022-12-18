const multer = require('multer')
const path = require('path')
const fs = require('fs')

const validationType = {
    image: ['image/png', 'image/jpg', 'image/jpeg'],
    files: ['application/pdf']
}

const multerHandelErrors = (error, req, res, next) => {
    if (error) {
        res.status(400).json({
            message: 'file too large',
            error
        })
    } else {
        next()
    }
}

function multerFn(customDest, type) {
    if (!customDest || customDest == '') {
        customDest = 'GeneralData'
    }
    if (!fs.existsSync(path.join(__dirname, `../uploads/${customDest}`))) {
        fs.mkdirSync(path.join(__dirname, `../uploads/${customDest}`), {
            recursive: true
        })
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            req.destination = `uploads/${customDest}`;
            cb(null, path.join(__dirname, `../uploads/${customDest}`))
        },
        filename: (req, file, cb) => {
            const fullName = "insta-" + new Date().getTime() + '-' + file.originalname
            cb(null, fullName);
        },
    })
    const fileFilter = (req, file, cb) => {
        if (type.includes(file.mimetype)) {
            cb(null, true)
        } else {
            req.fileUploadError = true;
            cb(null, false)
        }
    }
    return multer({
        storage,
        fileFilter,
        dest: path.join(__dirname, '../uploads')
    })
}

module.exports = {
    multerFn,
    validationType,
    multerHandelErrors
};