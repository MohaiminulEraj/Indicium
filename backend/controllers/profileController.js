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
        const profile = await User.findOne({
            user: req.user._id,
        })
        if (profile) {
            res.status(200).json({
                success: true,
                data: profile,
            });
        } else {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        // res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {

    // destructure the request
    const {
        name,
        user,
        username,
        location,
        bio,
        // spread the rest of the fields we don't need to check
        ...rest
    } = req.body;
    console.log(req.body)
    const userExists = await User.findOne({ username });

    if (userExists) {
        res.status(400)
        throw new Error('Username already exists!')
    }
    // build a profile
    const profileFields = {
        // user: req.user.id,
        name: req.body.name,
        location: req.body.location,
        bio: req.body.bio,
        // spread the rest of the fields we don't need to check
        ...rest
    };

    // Build socialFields object
    // const socialFields = { twitter, instagram, website, facebook };

    // // normalize social fields to ensure valid url
    // for (const [key, value] of Object.entries(socialFields)) {
    //     if (value && value.length > 0)
    //         socialFields[key] = normalize(value, { forceHttps: true });
    // }
    // // add to profileFields
    // profileFields.social = socialFields;

    try {
        // Using upsert option (creates new doc if no match is found):
        // let profile = await Profile.findOneAndUpdate(
        //     { user: req.user.id },
        //     { $set: profileFields },
        //     { new: true, upsert: true, setDefaultsOnInsert: true }
        // );
        let profile = await User.findOneAndUpdate(user, profileFields,
            {
                new: true, runValidators: true, useFindAndModify: false
            });
        res.status(200).json({
            success: true
        })

        // let profile = new User(
        //     req.body
        // );
        // profile = await profile.save();
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

export {
    getUserProfile,
    updateUserProfile
}
