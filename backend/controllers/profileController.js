import asyncHandler from 'express-async-handler'
import User from '../models/User.js';
import cloudinary from 'cloudinary'
import generateToken from '../utils/generateToken.js';
// Setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})



// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
    try {
        // console.log(req.user.id)
        // const profile = await Profile.findOne({
        //     user: req.user._id,
        // }).populate({ path: 'user', select: 'name avatar' });

        const profile = await User.findById(req.user.id).select('-password');;
        if (!profile) {
            res.status(400)
            throw new Error('User not found with this ID.')
        }

        res.status(200).json({
            success: true,
            data: profile
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    let newUserData = {
        name: req.body.name,
        walletPublicAdd: req.body.walletPublicAdd,
        location: req.body.location,
        bio: req.body.bio,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        facebook: req.body.facebook,
        website: req.body.website,
        notify_email: req.body.notify_email,
        notify_new_bids: req.body.notify_new_bids,
        notify_item_purchased: req.body.notify_item_purchased,
        notify_people_followed: req.body.notify_people_followed,
        status: 'UPDATE'
    }

    // Update avatar
    try {
        if (req.body.avatar !== '') {
            const user = await User.findById(req.user.id)

            const image_id = user.avatar.public_id;
            if (image_id !== undefined) {
                const res = await cloudinary.v2.uploader.destroy(image_id);
            }

            const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: 'indicium/avatars',
                width: 150,
                crop: "scale"
            })

            newUserData.avatar = {
                public_id: result.public_id,
                url: result.secure_url
            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// @desc    Update Cover photo
// @route   PUT /api/users/profile
// @access  Private
const updateCoverPhoto = asyncHandler(async (req, res) => {
    let newCoverPhoto = {
        coverPhoto: {
            public_id: '',
            url: ''
        }
    }
    // Update avatar
    try {
        if (req.body.coverPhoto !== '') {
            const user = await User.findById(req.user.id)

            const image_id = user.coverPhoto.public_id;
            if (image_id !== undefined) {
                const res = await cloudinary.v2.uploader.destroy(image_id);
            }

            const result = await cloudinary.v2.uploader.upload(req.body.coverPhoto, {
                folder: 'indicium/cover_photos',
                // width: 150,
                // crop: "scale"
            })
            newCoverPhoto.coverPhoto.public_id = result.public_id;
            newCoverPhoto.coverPhoto.url = result.secure_url;
            // newCoverPhoto.coverPhoto = {
            //     public_id: result.public_id,
            //     url: result.secure_url
            // }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    const user = await User.findByIdAndUpdate(req.user.id, newCoverPhoto, {
        new: true,
        unValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
const nftOwnerDetails = asyncHandler(async (req, res) => {
    try {
        // console.log(req.user.id)
        // const profile = await Profile.findOne({
        //     user: req.user._id,
        // }).populate({ path: 'user', select: 'name avatar' });
        const { id } = req.params
        // console.log('USERD ID', id)
        const profile = await User.findById(id).select('name avatar');
        // const profile = await User.find({}).select('name avatar');;
        if (!profile) {
            res.status(400)
            throw new Error('User not found with this ID.')
        }

        res.status(200).json(profile)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// // @desc    Update user profile
// // @route   PUT /api/users/profile
// // @access  Private  
// const updateUserProfile = asyncHandler(async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id)

//         if (user) {
//             user.name = req.body.name || user.name
//             user.walletPublicAdd = req.body.walletPublicAdd || user.walletPublicAdd
//             user.location = req.body.location || user.location
//             user.bio = req.body.bio || user.bio
//             user.instagram = req.body.instagram || user.instagram
//             user.twitter = req.body.twitter || user.twitter
//             user.facebook = req.body.facebook || user.facebook
//             user.website = req.body.website || user.website
//             user.notify_email = req.body.notify_email || user.notify_email
//             user.notify_new_bids = req.body.notify_new_bids || user.notify_new_bids
//             user.notify_item_purchased = req.body.notify_item_purchased || user.notify_item_purchased
//             user.notify_people_followed = req.body.notify_people_followed || user.notify_people_followed
//             // user.avatar = user.avatar
//             // if (req.body.password) {
//             //     user.password = req.body.password
//             // }
//             //Update avatar
//             // console.log(req.body.avatar.public_id)
//             if (req.body.avatar !== '') {
//                 // console.log(user.avatar)
//                 const image_id = user.avatar.public_id;
//                 // Delete user previous image/avatar
//                 if (image_id !== undefined) await cloudinary.v2.uploader.destroy(image_id);

//                 const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
//                     folder: 'indicium/avatars',
//                     width: '150',
//                     crop: 'scale',
//                     // public_id: 'avatar_' + user._id
//                 })
//                 // console.log(result)
//                 // user.avatar = {
//                 //     public_id: result.public_id,
//                 //     url: result.secure_url
//                 // }
//                 user.avatar.public_id = result.public_id
//                 user.avatar.url = result.secure_url
//                 // console.log(avatar)
//             }
//             const updatedUser = await user.save()

//             res.json({
//                 _id: updatedUser._id,
//                 name: updatedUser.name,
//                 walletPublicAdd: updatedUser.walletPublicAdd,
//                 location: updatedUser.location,
//                 bio: updatedUser.bio,
//                 instagram: updatedUser.instagram,
//                 twitter: updatedUser.twitter,
//                 facebook: updatedUser.facebook,
//                 website: updatedUser.website,
//                 notify_email: updatedUser.notify_email,
//                 notify_new_bids: updatedUser.notify_new_bids,
//                 notify_item_purchased: updatedUser.notify_item_purchased,
//                 notify_people_followed: updatedUser.notify_people_followed,
//                 avatar: updatedUser.avatar,
//             })
//         } else {
//             res.status(404)
//             throw new Error('User not found')
//         }
//     } catch (error) {
//         console.log(error)
//     }

// })

export {
    getUserProfile,
    updateUserProfile,
    nftOwnerDetails,
    updateCoverPhoto
}
