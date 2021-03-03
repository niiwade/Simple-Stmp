//Baseline requirements

require('dotenv').config();

//routes.js 
const router = require('express').Router();
const path = require('path');
const nodemailer = require('nodemailer');


//authenication using your gmail credentials

const transport = {
    //authenicates email sending

    host: 'smtp.gmail.com',
    port: 25,
    secure: true, //use TLS

    //create a .env file and define the process.env variables with your credentials

    auth: {
        user: process.env.SMTP_TO_EMAIL,
        pass: process.env.SMTP_TO_PASSWORD,
    },

};

//calling the transport function 

const transporter = nodemailer.createTransport(transport);
transporter.verify(
    (error, success) => {
        if (error) {
            //if error happens code stops
            console.error(error);
        } else {
            //this means code run
            console.log('Ready to send mail!');
        }
    }
)


router.get('/', (req, res, next) => {
    res.status(200).json({ msg: 'Working' });
});


router.post('/', (req, res, next) => {
    //make mailable object
    const mail = {
        from: process.env.STMP_FROM_EMAIL,
        to: process.env.STMP_TO_EMAIL,
        subject: "",
        text: `
            from: 
            ${req.body.name}

            contact details
            email: ${req.body.email}
            phone: ${req.body.tel}

            message: ${req.body.message}`,
    };

    //send mail to recepient 
    transporter.sendMail(mail)
})