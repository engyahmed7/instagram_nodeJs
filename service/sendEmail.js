const nodemailer = require("nodemailer");

// using nodemailer

async function sendEmail(dest, message) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "engya306@gmail.com", // generated ethereal user
            pass: "oksncxyqftdjkyvq", // generated ethereal password
        },
    });
    await transporter.sendMail({
        from: `"Fred Foo 👻" <${process.env.SenderEMAIL}>`, // sender address
        to: dest, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: message, // html body
    });
}


// using sendgrid

// const sgMail = require('@sendgrid/mail')
// function sendEmail(dest, message) {
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//     const msg = {
//         to: dest, // Change to your recipient
//         from: process.env.SenderEMAIL, // Change to your verified sender
//         subject: 'Verification',
//         text: 'verify your account',
//         html: message,
//     }
//     sgMail
//         .send(msg)
//         .then(() => {
//             console.log('Email sent')
//         })
//         .catch((error) => {
//             console.error(error)
//         })
// }

module.exports = sendEmail;