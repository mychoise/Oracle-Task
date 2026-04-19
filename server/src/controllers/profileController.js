import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

const IMAGE_DATA_URL_REGEX = /^data:image\/(png|jpe?g|webp|gif);base64,/i;

const uploadAvatarIfNeeded = async (avatarUrl, userId) => {
  if (typeof avatarUrl !== "string") {
    return null;
  }

  if (!IMAGE_DATA_URL_REGEX.test(avatarUrl)) {
    return avatarUrl;
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    const err = new Error("Cloudinary is not configured");
    err.statusCode = 500;
    throw err;
  }

  const uploadResult = await cloudinary.uploader.upload(avatarUrl, {
    folder: "oracle/avatars",
    public_id: `user-${userId}-${Date.now()}`,
    overwrite: true,
    resource_type: "image",
  });

  return uploadResult.secure_url;
};

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  handle: user.handle,
  bio: user.bio,
  github: user.github,
  avatarUrl: user.avatarUrl,
  techStack: user.techStack,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
};
export const updateProfile = async (req, res, next) => {
  try {
    const { name, handle, bio, github, avatarUrl, techStack } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (typeof name === "string") user.name = name;
    if (typeof handle === "string") user.handle = handle;
    if (typeof bio === "string") user.bio = bio;
    if (typeof github === "string") user.github = github;
    if (typeof avatarUrl === "string") {
      user.avatarUrl = await uploadAvatarIfNeeded(avatarUrl, user._id.toString());
    }
    if (Array.isArray(techStack)) user.techStack = techStack;
    await user.save();
    res.status(200).json({ success: true, data: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
};
