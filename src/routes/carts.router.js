import { Router } from 'express';
import { cartsModel } from '../dao/models/carts.models.js';
import CartManager from '../dao/Dao/CartManager.js';
import ProductManager from '../dao/Dao/ProductManager.js';

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

// create a cart
router.post(`/`, async (req, res) => {
  try {
    await cartManager.addCart();
    let result = await cartsModel.create({});
    res.send({ status: "success", payload: result });
  } catch (error) {
    console.error("Can't add carts whit mongoose" + error);
  }
});

// get cart by id
router.get(`/:cid`, async (req, res) => {
  try {
    let cid = req.params.cid;
    const result = await cartManager.getCartById(cid);
    // if the cart is not found in fs it will look for it in mongo
    if (result) {
      res.send({ status: "success", payload: result });
    } else {
      let result = await cartsModel.findById({ _id: cid });
      res.send({ status: "success", payload: result });
    }
  } catch (error) {
    console.error("Cant find the carts whit specific ID" + cid + error);
  }
});

// add a product to a cart
router.post(`/:cid/product/:pid`, async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;

  let cart = await cartsModel.findOne({_id: cid})
  cart.products.push({product: pid})
  let result = await cartsModel.updateOne(cart)
  console.log(result)
  res.send({ status: "success", payload: result });
});

export default router;