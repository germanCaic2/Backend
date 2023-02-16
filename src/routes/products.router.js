import { Router } from 'express'
import ProductManager from '../ProductManager.js'

const router = Router();
const productManager = new ProductManager();

router.get(`/`, async (req, res) => { productManager.getProducts(); res.send(productManager.products); });

router.get(`/:pid`, async (req, res) => {
  let id = parseInt(req.params.pid);
  productManager.getProductById(id);
  id <= productManager.products.length ? res.send(productManager.products[id]) : res.send(productManager.products);
});
// Recibe un JSON con el nuevo producto
router.post(`/`, async (req, res) => {
  const { title, description, price, status, stock, category, thumbnail } = req.body;
  productManager.addProduct(title, description, price, status, stock, category, thumbnail);
  res.send('New product added ' + title);
});
// Recibe un JSON con los nuevos datos 
// {
//   "title": "POSTMAN",
//   "description": "POSTMAN",
//   "price": "POSTMAN",
//   "thumbnail": "POSTMAN",
//   "stock": "POSTMAN",
//   "category": "POSTMAN",
//   "status": true
// }
router.put(`/:pid`, async (req, res) => {
  const id = (parseInt(req.params.pid))
  const newProduct = req.body;
  productManager.updateProduct(id, newProduct)
  res.send(productManager.products[id])
})

router.delete(`/:pid`, async (req, res) => {
  const id = (parseInt(req.params.pid))
  console.log(id)
  productManager.deleteProduct(id)
  res.send(`Product whit ID: ${id} was deleted`)
})

router.get(`/a/:query`, async (req, res) => {
  await productManager.getProducts()
  let limit = (parseInt(req.query.limit) - 1);
  let productLimit = []
  if (limit <= productManager.products.length) {
    for (let i = 0; i <= limit; i++) { productLimit.push(productManager.products[i]) }
    res.send(productLimit)
  } else { res.send(productManager.products) }
});

export default router;