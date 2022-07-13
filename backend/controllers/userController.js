import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';
import gravatar from 'gravatar';
import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';
import sgMail from '@sendgrid/mail'
import normalize from 'normalize-url';
import crypto from 'crypto';
import dotenv from 'dotenv';
import twilio from 'twilio';
dotenv.config()

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_API_KEY
    }
}))
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password, rememberMe } = req.body

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
        res.status(404)
        throw new Error('User not found!')
    }
    if (user && (await user.matchPassword(password))) {
        if (rememberMe) {
            storeInCookies(user, 200, res)
        } else {
            res.json({
                _id: user._id,
                email: user.email.toLowerCase(),
                token: generateToken(user._id),
            })
        }
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new twilio(accountSid, authToken);
    const { email, password, rememberMe } = req.body

    const userExists = await User.findOne({ email: email.toLowerCase() })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists!')
    }
    // if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(password) == false) {
    //     res.status(400)
    //     throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character')
    // }
    // await client.verify
    //     .services(process.env.SERVICE_ID)
    //     .verifications.create({ to: email, channel: "email" })
    //     .then((verification) => console.log(verification.sid))
    //     .catch((err) => console.log(err.message));

    const avatar = {
        url: normalize(
            gravatar.url(email.toLowerCase(), {
                s: '200',
                r: 'pg',
                d: 'mm'
            }),
            { forceHttps: true }
        )
    }
    const user = await User.create({
        email: email.toLowerCase(),
        password,
        avatar,
    })
    if (user) {

        if (rememberMe) {
            storeInCookies(user, 200, res)
        } else {
            res.status(201).json({
                _id: user._id,
                email: user.email,
                verified: user.verified,
                token: generateToken(user._id),
            })
        }

    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            email: user.email
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const forgotPassword = asyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404)
            throw new Error('User not found with this email');
        }
        // console.log(user)
        // Get reset token
        const resetToken = user.getResetPasswordToken();

        // await user.save({ validateBeforeSave: false });


        // Create reset password url
        const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
        // console.log(resetUrl);
        // const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

        const message = {
            to: user.email,
            from: process.env.EMAIL,
            subject: 'Your password reset token is as follow',
            text: `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`,
            html: `<p>Your password reset token is as follow:</p>\n\n<p>${resetUrl}</p>\n\n<p>If you have not requested this email, then ignore it.</p>`
        };

        await sgMail.send(message);


        // await transporter.sendMail({
        //     to: user.email,
        //     from: process.env.EMAIL,
        //     subject: "Indicium Password Recovery!",
        //     html: `<p>You requested for password reset</p>
        //                         <h5>click in this <a href="${resetUrl}">link</a> to reset password</h5>
        //                         <p>If you have not requested this email, then ignore it. Reset token will expire in 30 minutes</p>
        //                         <h5>You can copy and paste the link in the browser:${resetUrl}</h5>`
        // })


        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    }
    catch (error) {
        // user.resetPasswordToken = undefined;
        // user.resetPasswordExpire = undefined;
        // await user.save({ validateBeforeSave: false });
        // res.status(500)
        throw new Error(error.message);
    }
})


// const forgotPassword = asyncHandler(async (req, res) => {
//     crypto.randomBytes(32, (err, buffer) => {
//         if (err) {
//             console.log(err)
//         }
//         const token = buffer.toString("hex")
//         User.findOne({ email: req.body.email })
//             .then(user => {
//                 if (!user) {
//                     return res.status(422).json({ error: "User dont exists with that email" })
//                 }
//                 user.resetToken = token
//                 user.expireToken = Date.now() + 3600000
//                 user.save().then((result) => {
//                     transporter.sendMail({
//                         to: user.email,
//                         from: process.env.EMAIL,
//                         subject: "password reset",
//                         html: `
//                     <p>You requested for password reset</p>
//                     <h5>click in this <a href="http://localhost:3000/new-password/${token}">link</a> to reset password</h5>
//                     `
//                     })
//                     res.json({ message: "check your email" })
//                 }).catch(err => console.log(err))

//             }).catch(err => console.log(err))
//     })
// })

const resetPassword = asyncHandler(async (req, res) => {
    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        res.status(400)
        throw new Error('Password reset token is invalid or has been expired')
    }

    if (req.body.password !== req.body.confirmPassword) {
        res.status(400)
        throw new Error('Password does not match')
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    storeInCookies(user, 200, res)
})

const updatePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        throw new Error('Old password is incorrect');
    }

    user.password = req.body.password;
    await user.save();

    storeInCookies(user, 200, res)
})

const verifyEmail = asyncHandler(async (req, res) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new twilio(accountSid, authToken);
    const { code, userEmail } = req.body
    // const user = await User.findById(req.user._id)
    const verifiedEmail = {
        verified: true
    }
    // console.log(code, userEmail)
    let xyz = await client.verify.services(process.env.SERVICE_ID)
        .verificationChecks
        .create({ to: userEmail, code: code })
    if (xyz.status !== 'approved') {
        res.status(401)
        throw new Error('Email not verified')
    }

    const user = await User.findOneAndUpdate({ email: userEmail }, verifiedEmail, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.json({ message: "Email verified" })
    // user.verified = true
    // await user.save().then(result => {
    //     res.json({ message: "Email verified!" })
    // }).catch(err => console.log(err))

})

const storeInCookies = (user, statusCode, res) => {
    const token = generateToken(user._id)
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true
    }
    res
        .status(statusCode)
        .cookie('token', token, cookieOptions)
        .json({
            _id: user._id,
            email: user.email,
            token,
        })
}

export {
    authUser,
    registerUser,
    getUserProfile,
    forgotPassword,
    resetPassword,
    updatePassword,
    verifyEmail
}