import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';
import gravatar from 'gravatar';
import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';
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

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password, rememberMe } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        if (rememberMe) {
            storeInCookies(user, 200, res)
        } else {
            res.json({
                _id: user._id,
                email: user.email,
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

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists!')
    }
    await client.verify
        .services('VAc146727b775c0f56aa85c5e5f1aa34b0')
        .verifications.create({ to: email, channel: "email" })
        .then((verification) => console.log(verification.sid))
        .catch((err) => console.log(err.message));

    const avatar = normalize(
        gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        }),
        { forceHttps: true }
    );
    const user = await User.create({
        email,
        password,
        avatar
    })
    if (user) {

        if (rememberMe) {
            storeInCookies(user, 200, res)
        } else {
            res.status(201).json({
                _id: user._id,
                email: user.email,
                token: generateToken(user._id),
            })
        }

    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Get user profile
// @route   GET /api/users/profile
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
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(422).json({ error: "User dont exists with that email" })
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save().then((result) => {
                    transporter.sendMail({
                        to: user.email,
                        from: process.env.EMAIL,
                        subject: "password reset",
                        html: `
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000/new-password/${token}">link</a> to reset password</h5>
                    `
                    })
                    res.json({ message: "check your email" })
                }).catch(err => console.log(err))

            }).catch(err => console.log(err))
    })
})

const verifyEmail = asyncHandler(async (req, res) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new twilio(accountSid, authToken);
    const { code } = req.body

    // await client.verify
    //     .services('VAc146727b775c0f56aa85c5e5f1aa34b0')
    //     .verifications.create({ to: email, channel: "email" })
    //     .then((verification) => console.log(verification.sid))
    //     .catch((err) => console.log(err.message));

    // console.log(req)
    let xyz = await client.verify.services('VAc146727b775c0f56aa85c5e5f1aa34b0')
        .verificationChecks
        .create({ to: 'eraj471@gmail.com', code: code })
        .then(verification_check => console.log(verification_check.status))
    console.log(xyz.status)
    if (xyz.status !== 'approved') {
        res.status(401)
        throw new Error('Email not verified')
    }

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
    verifyEmail
}