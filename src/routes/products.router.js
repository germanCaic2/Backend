import { Router } from 'express';
import { productsModel } from '../dao/models/products.models.js'
import ProductManager from '../dao/Dao/ProductManager.js';

const router = Router();
const productManager = new ProductManager()
productManager.getProducts();

// get the products
router.get(`/`, async (req, res) => {
  try {
    let products = await productsModel.find();
    res.send({ status: "success", payload: products });
  } catch (error) {
    console.error("Can't find products with mongoose" + error);
    res.status(500).send({ error: "Can't find products with mongoose", message: error });
  };
});

// get product by id
router.get(`/:pid`, async (req, res) => {
  try {
    let { pid } = req.params;
    let result = await productManager.getProductById(pid)

    if (result) {
      res.send({ status: "success", payload: result });
    } else {
      let result = await productsModel.findById({ _id: pid });
      res.send({ status: "success", payload: result });
    }
  } catch (error) {
    console.error("The product cant be finded by specific ID" + error);
  };
});

// add a new product (req expect to receive a JSON whit all params for body)
router.post(`/`, async (req, res) => {
  try {
    let { title, description, price, status, stock, category, thumbnail } = req.body;
    if (!title || !description || !price || !status || !stock || !category || !thumbnail) return res.send({ status: "error", error: "Incomplete values" });
    productManager.addProduct(title, description, price, status, stock, category, thumbnail);
    let product = await productsModel.create({ title, description, price, status, stock, category, thumbnail });
    res.send({ status: "success", payload: product });
  } catch (error) {
    console.error("Cant add products whit mongose" + error);
  };
});

// update a product by specific ID (req expect to receive a JSON whit all params for body)
router.put(`/:pid`, async (req, res) => {
  try {
    let { pid } = req.params;
    let productUpdated = req.body;
    if (!productUpdated.title || !productUpdated.description || !productUpdated.price || !productUpdated.status || !productUpdated.stock || !productUpdated.category || !productUpdated.thumbnail)
      return res.send({ status: "error", error: "Incomplete values" });
    let result = await productsModel.updateOne({ _id: pid }, productUpdated);
    res.send({ status: "success", payload: result });
  } catch (error) {
    console.error("The product cant be updated" + error);
  };
});

// delete a product by specific ID
router.delete(`/:pid`, async (req, res) => {
  try {
    let { pid } = req.params;
    let result = await productsModel.deleteOne({ _id: pid });
    res.send({ status: "success product was deleted", payload: result });
  } catch (error) {
    console.error("The product cant be deleted by id" + error);
  };
});

// limit the products displayed in the screen
router.get(`/limit/:query`, async (req, res) => {
  try {
    let limit = req.query.limit;
    if (!limit) {
      let result = await productsModel.find({});
      res.send({ status: "success", payload: result });
    } else {
      let result = await productsModel.find().limit(limit);
      res.send({ status: "success", payload: result });
    };
  } catch (error) {
    console.error("cant limit the products quantity" + error);
  };
});

export default router;