import { Router } from 'express';
import { productsModel } from '../dao/models/products.models.js'

const router = Router();

// Show all products
router.get(`/`, async (req, res) => {
  try {
    let products = await productsModel.find();
    res.render('home', { products: products });
  } catch (error) {
    console.error("Can't find products with mongoose" + error);
    res.status(500).send({ error: "Can't find products with mongoose", message: error });
  };
});

router.get(`/realtimeproducts/`,async (req, res) => {
  res.render('realTimeProducts');
});

export default router;