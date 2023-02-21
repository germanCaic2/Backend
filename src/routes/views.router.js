import { Router } from 'express'
import ProductManager from '../ProductManager.js';

const router = Router();
const productManager = new ProductManager();
const Products = await productManager.getProducts();

router.get(`/`,(req, res)=>{
  res.render('home',{Products:Products[4]})
});

export default router;