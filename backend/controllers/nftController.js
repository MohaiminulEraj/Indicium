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
        throw new Error('Invalid NFT data')
    }
})

const getUsersNft = asyncHandler(async (req, res) => {
    const { userId } = req.query
    // console.log(req.body);
    // console.log(userId);
    let nft = null;
    if (userId) {
        nft = await Nft.find({
            // userId: String(id)
            userId: userId
        })
    } else {
        nft = await Nft.find({})
    }
    // console.log('nft', nft);
    if (nft) {
        // return res.status(201).json({
        //     _id: nft._id,
        //     userId: nft.userId,
        //     ipfsDataLink: nft.ipfsDataLink,
        // })
        res.status(201).json(nft)
    } else {
        res.status(400)
        throw new Error('NFT Asset not found!')
    }
})

const getNftById = asyncHandler(async (req, res) => {
    const { id } = req.params
    let nft = await Nft.findById(id)
    if (nft) {
        res.status(201).json(nft)
    } else {
        res.status(400)
        throw new Error('NFT Asset not found!')
    }
})


export {
    saveNftUrl,
    getUsersNft,
    getNftById
}