import { Router } from 'express'
import ProductManager from '../ProductManager.js'

const router = Router();
const productManager = new ProductManager();

let products = [];
const getProducts = async () => products = await productManager.getProducts();
getProducts();

router.get(`/`, (req, res) => { res.send(products); });

let getProductByID = [];
router.get(`/:id`, (req, res) => {
  let id = parseInt(req.params.id)
  console.log(id)
  if (id <= products.length) {
    const getProductsByID = async (id) => getProductByID = await productManager.getProductById(id);
    getProductsByID(id)
    res.send(getProductByID);
  } else { res.send(products) }
});

const addProduct = async (title, description, price, status, stock, category, thumbnail)=>{
  await productManager.addProduct(title, description, price, status, stock, category, thumbnail)
}

router.post(`/`, (req, res)=>{
  const {title, description, price, status, stock, category, thumbnail } = req.body
  addProduct(title, description, price, status, stock, category, thumbnail )
  res.send('ok')
});

export default router;