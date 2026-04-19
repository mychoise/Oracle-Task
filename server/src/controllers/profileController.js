import User from "../models/User.js";
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
    if (typeof avatarUrl === "string") user.avatarUrl = avatarUrl;
    if (Array.isArray(techStack)) user.techStack = techStack;
    await user.save();
    res.status(200).json({ success: true, data: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
};
