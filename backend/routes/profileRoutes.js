import express from 'express'
const router = express.Router()
import {
    getCurrentUser,
    updateProfile
} from '../controllers/profileController.js'
import { protect } from '../middleware/authMiddleware.js'


router.route('/me').get(protect, getCurrentUser)
router.route('/').post(protect, updateProfile)

export default router