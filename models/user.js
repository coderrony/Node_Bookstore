import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minLength: 2, maxLength: 50 },
  lastName: { type: String, minLength: 2, maxLength: 50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  userType: { type: String, enum:["guest","admin"],default:"guest"},
  addToCart:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Book"
    }
  ],
  whiteList:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Book"
    }
  ],
}, { timestamps: true });

export const User= mongoose.models.User || mongoose.model('User', userSchema);


