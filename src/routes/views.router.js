import { Router } from 'express';
import { productsModel } from '../dao/models/products.models.js'
import ProductManager from '../dao/Dao/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

// Show all products
router.get(`/`, async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products: products });
});

// Show all products in realTime
router.get(`/realtimeproducts/`, async (req, res) => {
  res.render('realTimeProducts');
});

// Show all products 
// router.get(`/products`, async (req, res) => {
//   try {
//     let products = await productsModel.find();
//     res.render('home', { products: products });
//   } catch (error) {
//     console.error("Can't find products with mongoose" + error);
//     res.status(500).send({ error: "Can't find products with mongoose", message: error });
//   };
// });

export default router;