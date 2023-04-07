import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = new mongoose.Schema({
  username: String,
  age: Number,
  email: {
    type: String,
    unique: true
  },
  password: String
});

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;