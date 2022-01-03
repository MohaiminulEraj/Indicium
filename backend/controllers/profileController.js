import asyncHandler from 'express-async-handler'
import Profile from '../models/Profile.js'
import normalize from 'normalize-url';

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
const getCurrentUser = asyncHandler(async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user._id
        }).populate('user', ['name', 'email', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
const updateProfile = asyncHandler(async (req, res) => {

    // destructure the request
    const {
        name,
        username,
        walletPublicAddress,
        bio,
        // spread the rest of the fields we don't need to check
        ...rest
    } = req.body;

    const userExists = await Profile.findOne({ username });

    if (userExists) {
        res.status(400)
        throw new Error('Username already exists!')
    }
    // build a profile
    const profileFields = {
        user: req.user.id,
        ...rest
    };

    // Build socialFields object
    const socialFields = { twitter, instagram, website, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
        if (value && value.length > 0)
            socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;

    try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

export {
    getCurrentUser,
    updateProfile
}
