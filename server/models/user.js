import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    image: {
      type: String,
      default: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
