import express from 'express'
const router = express.Router()
import {
    saveNftUrl,
    getUsersNft,
    getNftById,
    getNftByUserId
} from '../controllers/nftController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(saveNftUrl)
router.route('/owned').get(getUsersNft)
router.route('/:id').get(getNftById)
router.route('/user/:id').get(getNftByUserId)

export default router