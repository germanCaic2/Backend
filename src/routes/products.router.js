import { Router } from 'express'
import ProductManager from '../ProductManager.js'

const router = Router();
const productManager = new ProductManager();

let products = [];
let getProductByID = [];

const getProducts = async () => products = await productManager.getProducts();
getProducts();

router.get(`/`, async (req, res) => { res.send(products); });

router.get(`/:pid`, async (req, res) => {
  let id = parseInt(req.params.pid);
  const getProductsByID = async (id) => getProductByID = await productManager.getProductById(id);
  getProductsByID(id);
  id <= products.length ? res.send(getProductByID) : res.send(products);
});
// Recibe un JSON con el nuevo producto
router.post(`/`, async (req, res) => {
  const addProduct = async (title, description, price, status, stock, category, thumbnail) => {
    await productManager.addProduct(title, description, price, status, stock, category, thumbnail);
  };
  const { title, description, price, status, stock, category, thumbnail } = req.body;
  addProduct(title, description, price, status, stock, category, thumbnail);
  res.send('ok');
});
// Recibe un JSON con los nuevos datos 
router.put(`/:pid`, async (req, res) => {
  const id = (parseInt(req.params.pid))
  const newProduct = req.body;
  const updateProduct = async (id, newProduct) => { updateProduct = await productManager.updateProduct(id, newProduct) }
  updateProduct(id, newProduct)
})
// {
//   "title": "POSTMAN",
//   "description": "POSTMAN",
//   "price": "POSTMAN",
//   "thumbnail": "POSTMAN",
//   "stock": "POSTMAN",
//   "category": "POSTMAN",
//   "status": true
// }
router.delete(`/:pid`, async(req, res)=>{
  const id = (parseInt(req.params.pid))
  console.log(id)
  productManager.deleteProduct(id)
})
export default router;