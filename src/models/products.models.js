import mongoose from "mongoose";
const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
  title: { type: String, unique: true, require: true },
  description: { type: String, unique: true, require: true },
  price: { type: String, unique: true, require: true },
  status: { type: String, unique: true, require: true },
  stock: { type: String, unique: true, require: true },
  category: { type: String, unique: true, require: true },
  thumbnail: { type: String, unique: true, require: true }
});

export const productsModel = mongoose.model(productsCollection, productsSchema);