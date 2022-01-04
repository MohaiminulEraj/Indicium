import asyncHandler from 'express-async-handler'
import Profile from '../models/Profile.js'
import User from '../models/User.js';
import normalize from 'normalize-url';


// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
    try {
        // console.log(req.user.id)
        // const profile = await Profile.findOne({
        //     user: req.user._id,
        // }).populate({ path: 'user', select: 'name avatar' });

        const profile = await User.findById(req.user.id);
        if (!profile) {
            res.status(400)
            throw new Error('User not found with this ID.')
        }

        res.status(200).json({
            success: true,
            data: profile
        })


        // const profile = await User.findOne({
        //     user: req.user.id,
        // })
        // if (profile) {
        //     res.status(200).json({
        //         success: true,
        //         data: profile,
        //     });
        //     console.log(profile)
        // } else {
        //     return res.status(400).json({ msg: 'There is no profile for this user' });
        // }

        // res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.walletPublicAdd = req.body.walletPublicAdd || user.walletPublicAdd
        user.location = req.body.location || user.location
        user.bio = req.body.bio || user.bio
        user.instagram = req.body.instagram || user.instagram
        user.twitter = req.body.twitter || user.twitter
        user.facebook = req.body.facebook || user.facebook
        user.website = req.body.website || user.website
        user.notify_email = req.body.notify_email || user.notify_email
        user.notify_new_bids = req.body.notify_new_bids || user.notify_new_bids
        user.notify_item_purchased = req.body.notify_item_purchased || user.notify_item_purchased
        user.notify_people_followed = req.body.notify_people_followed || user.notify_people_followed
        user.avatar.public_id = req.body.avatar.public_id || user.avatar.public_id
        // if (req.body.password) {
        //     user.password = req.body.password
        // }
        //Update avatar
        if (req.body.avatar !== '') {
            const image_id = user.avatar.public_id;
            // Delete user previous image/avatar
            if (image_id !== undefined) await cloudinary.v2.uploader.destroy(image_id);

            const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: 'indicium/avatars',
                width: '150',
                crop: 'scale'
            })
            updatedUser.avatar = {
                public_id: result.public_id,
                url: result.secure_url
            }
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            walletPublicAdd: updatedUser.walletPublicAdd,
            location: updatedUser.location,
            bio: updatedUser.bio,
            instagram: updatedUser.instagram,
            twitter: updatedUser.twitter,
            facebook: updatedUser.facebook,
            website: updatedUser.website,
            notify_email: updatedUser.notify_email,
            notify_new_bids: updatedUser.notify_new_bids,
            notify_item_purchased: updatedUser.notify_item_purchased,
            notify_people_followed: updatedUser.notify_people_followed,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// // @route    POST api/profile
// // @desc     Create or update user profile
// // @access   Private
// const updateUserProfile = asyncHandler(async (req, res) => {

//     // destructure the request
//     const {
//         name,
//         user,
//         username,
//         location,
//         bio,
//         // spread the rest of the fields we don't need to check
//         ...rest
//     } = req.body;
//     console.log(req.body)
//     // const userExists = await User.findOne({ username });

//     // if (userExists) {
//     //     res.status(400)
//     //     throw new Error('Username already exists!')
//     // }
//     // build a profile
//     const profileFields = {
//         // user: req.user.id,
//         name: req.body.name,
//         location: req.body.location,
//         bio: req.body.bio,
//         // spread the rest of the fields we don't need to check
//         ...rest
//     };
//     //Update avatar
//     // if (req.body.avatar !== '') {
//     //     const image_id = user.avatar.public_id;
//     //     // Delete user previous image/avatar
//     //     if (image_id !== undefined) await cloudinary.v2.uploader.destroy(image_id);

//     //     const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
//     //         folder: 'careforyou/avatars',
//     //         width: '150',
//     //         crop: 'scale'
//     //     })
//     //     user.avatar = {
//     //         public_id: result.public_id,
//     //         url: result.secure_url
//     //     }
//     // }

//     // Build socialFields object
//     // const socialFields = { twitter, instagram, website, facebook };

//     // // normalize social fields to ensure valid url
//     // for (const [key, value] of Object.entries(socialFields)) {
//     //     if (value && value.length > 0)
//     //         socialFields[key] = normalize(value, { forceHttps: true });
//     // }
//     // // add to profileFields
//     // profileFields.social = socialFields;

//     try {
//         // Using upsert option (creates new doc if no match is found):
//         // let profile = await Profile.findOneAndUpdate(
//         //     { user: req.user.id },
//         //     { $set: profileFields },
//         //     { new: true, upsert: true, setDefaultsOnInsert: true }
//         // );
//         let profile = await User.findOneAndUpdate(user, profileFields,
//             {
//                 new: true, runValidators: true, useFindAndModify: false
//             });
//         res.status(200).json({
//             success: true
//         })

//         // let profile = new User(
//         //     req.body
//         // );
//         // profile = await profile.save();
//         return res.json(profile);
//     } catch (err) {
//         console.error(err.message);
//         return res.status(500).send('Server Error');
//     }
// });

export {
    getUserProfile,
    updateUserProfile
}
