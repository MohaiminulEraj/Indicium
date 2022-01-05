import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please enter valid email address'],
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        public_id: {
            type: String,
            // required: true,
        },
        url: {
            type: String,
            // required: true,
        }
    },
    name: {
        type: String,
        // required: true,
        default: 'User'
    },
    username: {
        type: String,
        // required: true,
        // default: "u",
        unique: true
    },
    location: {
        type: String,
        // required: true,
        default: 'lc'
    },
    walletPublicAdd: {
        type: String
    },
    bio: {
        type: String,
        // required: true,
        default: 'b',
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
    },
    verified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'REGISTER NEW'
    }
}, {
    timestamps: true
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
// module.exports = User = mongoose.model('User', UserSchema)
const User = mongoose.model('User', UserSchema)

export default User