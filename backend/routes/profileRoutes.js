import express from 'express'
const router = express.Router()
import {
    getUserProfile,
    updateUserProfile
} from '../controllers/profileController.js'
import { protect } from '../middleware/authMiddleware.js'


// router.route('/me').get(protect, getCurrentUser)
// router.route('/').post(protect, updateProfile)
router
    .route('/')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router