import { Router } from 'express';
import { productsModel } from '../dao/DB/models/products.models.js'
import ProductManager from '../dao/filesystem/ProductManager.js'

const router = Router();
const productManager = new ProductManager();

// Show all products
router.get(`/`, async (req, res) => {
  try {
    let products = await productsModel.find();
    // res.send({ status: "success", payload: products });
    res.render('home', { products: products });
  } catch (error) {
    console.error("Can't find products with mongoose" + error);
    res.status(500).send({ error: "Can't find products with mongoose", message: error });
  };
  // const Products = await productManager.getProducts();
});

router.get(`/realtimeproducts/`,async (req, res) => {
  res.render('realTimeProducts');
});

export default router;