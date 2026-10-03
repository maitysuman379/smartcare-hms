const {
  getUserProfileById,
  updateUserProfile,
} = require("../models/userModel");

/*
 * Get logged-in user's profile
 */
const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await getUserProfileById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get my profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

/*
 * Update logged-in user's profile
 */
const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      username,
      profile_image,
      phone,
      date_of_birth,
      gender,
      address,
      city,
      state,
      pincode,
      emergency_contact_name,
      emergency_contact_phone,
      emergency_contact_relation,
    } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    await updateUserProfile(userId, {
      username: username.trim(),
      profile_image: profile_image || null,
      phone: phone || null,
      date_of_birth: date_of_birth || null,
      gender: gender || null,
      address: address || null,
      city: city || null,
      state: state || null,
      pincode: pincode || null,
      emergency_contact_name: emergency_contact_name || null,
      emergency_contact_phone: emergency_contact_phone || null,
      emergency_contact_relation: emergency_contact_relation || null,
    });

    const updatedUser = await getUserProfileById(userId);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update my profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
};
