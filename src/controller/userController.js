const User = require('../models/user');

// Save form data
const saveFormData = async (req, res) => {
  try {
    const { name, mobile, referralCode, gender, technology, dateOfBirth } = req.body;
    console.log("req.body===>",req.body);
    
    const profilePics = req.files.map(file => file.path);
    let points = 0;
    
    let referralUser = null;
    if (referralCode) {
      referralUser = await User.findOne({ referralCode });
      if (referralUser) {
        points = 10;
        referralUser.points += 20;
        await referralUser.save();
      }
    }

    const user = new User({ name, mobile, referralCode, gender, technology, profilePic: profilePics, dateOfBirth, points, referralUser: referralUser ? referralUser._id : null });
    await user.save();
    res.status(201).json({ message: 'User saved successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Fetch referral user 
const fetchReferralList = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const referrals = await User.find({ referralUser: req.user._id })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    res.status(200).json({ referrals });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete 
const deleteReferralUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Referral user deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update
const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { saveFormData, fetchReferralList, deleteReferralUser, updateProfile };
