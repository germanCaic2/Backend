import { response, Router } from 'express';
import CartManager from '../CartManager.js';
import ProductManager from '../ProductManager.js';
const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

router.post(`/`, async (req, res) => {
  let newProduct = await cartManager.addCart();
  let { id, procucts } = newProduct;
  res.send(`New cart created whit ID: ${id}`);
});

router.get(`/:cid`, async (req, res) => {
  const id = parseInt(req.params.cid)
  const cartById = await cartManager.getCartById(id)
  res.send(cartById)
});

router.post(`/:cid/product/:pid`, async (req, res) => {
  const cid = parseInt(req.params.cid)
  const pid = parseInt(req.params.pid)
  const p = productManager.getProductById(pid)
  const c = cartManager.getCartById(cid)
  console.log(p)
})

export default router;