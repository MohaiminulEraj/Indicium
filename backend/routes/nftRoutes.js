import express from 'express'
const router = express.Router()
import {
    saveNftUrl,
    getUsersNft
} from '../controllers/nftController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(saveNftUrl)
router.route('/owned').get(getUsersNft)

export default router