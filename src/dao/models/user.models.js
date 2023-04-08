import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = new mongoose.Schema({
  username: String,
  age: Number,
  email: {
    type: String,
    unique: true
  },
  password: String,
  rol: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;