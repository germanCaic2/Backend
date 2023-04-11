import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  age: Number,
  password: String,
  cart: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;