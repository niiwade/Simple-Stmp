//Baseline requirements

require('dotenv').config()

//routes.js 
const router = require('express').Router()
const path = require('path')
const nodemailer = require('nodemailer')


//authenication using your gmail credentials

const transfer = {
    //authenicates email sending

    host: 'smtp.gmail.com',
    port: 25,
    secure: true, //use TLS

    //create a .env file and define the process.env variables with your credentials

    auth: {
        user: process.env.SMTP_TO_EMAIL,
        pass: process.env.SMTP_TO_PASSWORD,
    },

}

const transferer = nodemailer.createTransfer(transfer)
transferer.verify(
    (error, success) => {
        if (error) {
            //if error happens code stops
            console.error(error)
        } else {
            //this means code run
            console.log('Ready to send mail!')
        }
    }
)


router.get('/', (req, res, next) => {
    res.status(200).json({ msg: 'Working' })
})