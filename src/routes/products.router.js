import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const router = Router();
const productManager = new ProductManager();
// get the products
router.get(`/`, async (req, res) => { productManager.getProducts(); res.send(productManager.products); });
// get product by id
router.get(`/:pid`, async (req, res) => {
  let id = parseInt(req.params.pid);
  productManager.getProductById(id);
  id <= productManager.products.length ? res.send(productManager.products[id]) : res.send(productManager.products);
});
// add a new product (req expect to receive a JSON whit all params for body)
router.post(`/`, async (req, res) => {
  const { title, description, price, status, stock, category, thumbnail } = req.body;
  productManager.addProduct(title, description, price, status, stock, category, thumbnail);
  res.send('New product added ' + title);
});
// update a product by specific ID (req expect to receive a JSON whit all params for body)
router.put(`/:pid`, async (req, res) => {
  const id = (parseInt(req.params.pid));
  const newProduct = req.body;
  productManager.updateProduct(id, newProduct);
  res.send(productManager.products[id]);
});
// delete a product by specific ID
router.delete(`/:pid`, async (req, res) => {
  const id = (parseInt(req.params.pid));
  console.log(id);
  productManager.deleteProduct(id);
  res.send(`Product whit ID: ${id} was deleted`);
});
// limit the products displayed in the screen
router.get(`/limit/:query`, async (req, res) => {
  await productManager.getProducts();
  let limit = (parseInt(req.query.limit) - 1);
  let productLimit = [];
  if (limit <= productManager.products.length) {
    for (let i = 0; i <= limit; i++) { productLimit.push(productManager.products[i]) };
    res.send(productLimit);
  } else { res.send(productManager.products) };
});

export default router;