import {Router} from 'express'
import CartManager from '../CartManager.js';
const router = Router();
const cartManager = new CartManager();

router.post(`/`, async (req, res) => {
  let newProduct = await cartManager.addCart()
  let {id, procucts } = newProduct
    res.send (`New cart created whit ID: ${id}`);
});

export default router;