const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure:true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


app.post('/send-email', (req, res) => {
    const { speed } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'shiras.vm@gmail.com',
        subject: 'Speed Alert',
        text: `The vehicle speed has exceeded 80 km/h. Current speed: ${speed} km/h`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email: ' + error.message);
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
