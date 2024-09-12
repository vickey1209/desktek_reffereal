const express = require('express');
const { saveFormData, fetchReferralList, deleteReferralUser, updateProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const multer = require('multer');
const router = express.Router();

// File upload config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/save', upload.array('profilePic', 5), authenticateToken, saveFormData);
router.get('/referrals', auth, fetchReferralList);
router.delete('/referral/:id', auth, deleteReferralUser);
router.put('/update', auth, updateProfile);

module.exports = router;
