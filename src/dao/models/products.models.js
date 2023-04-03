import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'products';

const property = { type: String, unique: true, require: true }
const productsSchema = new mongoose.Schema({
  title: property,
  description: property,
  price: property,
  status: property,
  stock: property,
  category: property,
  thumbnail: property
});

productsSchema.plugin(mongoosePaginate);
export const productsModel = mongoose.model(productsCollection, productsSchema);