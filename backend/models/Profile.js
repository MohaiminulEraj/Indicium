import mongoose from 'mongoose'

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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
    walletPublicAddress: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true,
        maxLength: 200
    },
    social: {
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
        }
    },
    notifications: {
        email: {
            type: Boolean
        },
        new_bids: {
            type: Boolean
        },
        item_purchased: {
            type: Boolean
        },
        people_followed: {
            type: Boolean
        }
    }

}, {
    timestamps: true
});


const Profile = mongoose.model('Profile', ProfileSchema)

export default Profile