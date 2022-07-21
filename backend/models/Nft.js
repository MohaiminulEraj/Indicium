import mongoose from 'mongoose'

const NftSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userId: {
        type: String,
        required: true,
    },
    ipfsDataLink: {
        type: String,
        required: true,
        // unique: true
    }
}, {
    timestamps: true
});


const Nft = mongoose.model('Nft', NftSchema)

export default Nft