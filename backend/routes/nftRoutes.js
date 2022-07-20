import express from 'express'
const router = express.Router()
import {
    saveNftUrl
} from '../controllers/nftController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(saveNftUrl)

export default router