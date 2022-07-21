import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Nft from '../models/Nft.js';
import gravatar from 'gravatar';
import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';
import sgMail from '@sendgrid/mail'
import normalize from 'normalize-url';
import crypto from 'crypto';
import dotenv from 'dotenv';
import twilio from 'twilio';
dotenv.config()


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const saveNftUrl = asyncHandler(async (req, res) => {

    const { id, ipfsDataLink } = req.body

    const nft = await Nft.create({
        userId: id, ipfsDataLink
    })
    if (nft) {
        res.status(201).json({
            _id: nft._id,
            userId: nft.id,
            ipfsDataLink: nft.ipfsDataLink,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


export {
    saveNftUrl
}