import { response, Router } from 'express';
import CartManager from '../CartManager.js';
import ProductManager from '../ProductManager.js';

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();
// create a cart
router.post(`/`, async (req, res) => {
  let newProduct = await cartManager.addCart();
  let { id } = newProduct;
  res.send(`New cart created whit ID: ${id}`);
});
// get cart by id
router.get(`/:cid`, async (req, res) => {
  const id = parseInt(req.params.cid);
  const cartById = await cartManager.getCartById(id);
  res.send(cartById);
});
// add a product to a cart
router.post(`/:cid/product/:pid`, async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  const p = await productManager.getProductById(pid);
  const c = await cartManager.getCartById(cid);
  await cartManager.cartBuilder(c, p);
  response.status(200).json(cart);
});

export default router;