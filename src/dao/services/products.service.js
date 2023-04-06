import { productsModel } from "../models/products.models.js";

export default class ProductService {
    getAll = async () => {
        let products = await productsModel.find();
        return products.map(product => product.toObject());
    };

    save = async (product) =>{
        let result = await productsModel.create(product);
        return result;
    };

    updateOne = async (prodId, product) =>{
        let updateProduct = await productsModel.updateOne({_id: prodId}, product);
        return updateProduct;
    };

    getById = async (_id) =>{
        let getProdById = await productsModel.findById(_id);
        return getProdById.toObject();
    };

    deleteOne = async (_id) =>{
        let deleteOne = await productsModel.deleteOne(_id);
        return deleteOne;
    };
};