const mongoose = require("mongoose");
const { emitWarning } = require("process");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min:3,
      max:30,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      max:50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min:8
    },
    token: {
      type: String,
    },
    isAvatarImageSet:{
        type:Boolean,
        default: false
    },
    avatarImage:{
        type:String,
        default:""
    }
  },
  { timestamps: true, }
);


module.exports = mongoose.model("User", UserSchema);