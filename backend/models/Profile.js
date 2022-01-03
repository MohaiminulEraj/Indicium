import mongoose from 'mongoose'

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        default: 'User'
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true,
    },
    walletPublicAddress: {
        type: String
    },
    bio: {
        type: String,
        required: true,
        maxLength: 200
    },
    instagram: {
        type: String
    },
    twitter: {
        type: String
    },
    facebook: {
        type: String
    },
    website: {
        type: String
    },
    notify_email: {
        type: Boolean
    },
    notify_new_bids: {  
        type: Boolean
    },
    notify_item_purchased: {
        type: Boolean
    },
    notify_people_followed: {
        type: Boolean
    }

}, {
    timestamps: true
});


const Profile = mongoose.model('Profile', ProfileSchema)

export default Profile