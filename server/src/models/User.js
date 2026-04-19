import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
	name: {
	  type: String,
	  required: [true, "Name is required"],
	  trim: true,
	},
	email: {
	  type: String,
	  required: [true, "Email is required"],
	  unique: true,
	  lowercase: true,
	  trim: true,
	},
	password: {
	  type: String,
	  required: [true, "Password is required"],
	  minlength: 8,
	},
	handle: {
	  type: String,
	  trim: true,
	  default: "",
	  unique: true,
	  sparse: true,
	},
	bio: {
	  type: String,
	  trim: true,
	  default: "",
	  maxlength: 200,
	},
	github: {
	  type: String,
	  trim: true,
	  default: "",
	},
	avatarUrl: {
	  type: String,
	  default: "",
	},
	techStack: {
	  type: [String],
	  default: [],
	},
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

