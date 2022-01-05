import express from 'express'
const router = express.Router()
import {
    getUserProfile,
    updateUserProfile,
    updateCoverPhoto
} from '../controllers/profileController.js'
import { protect } from '../middleware/authMiddleware.js'


// router.route('/me').get(protect, getCurrentUser)
// router.route('/').post(protect, updateProfile)
router
    .route('/')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route('/cover-photo').put(protect, updateCoverPhoto)

export default router