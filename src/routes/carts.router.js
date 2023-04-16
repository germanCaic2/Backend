import { Router } from 'express';
import { cartsModel } from '../models/carts.models.js';
import CartManager from '../dao/CartManager.js';
import ProductManager from '../dao/ProductManager.js';

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

// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
router.delete("/:cartId/product/:prodId", async (request, response) =>{
  try{
      let cartId = request.params.cartId;
      let prodId = request.params.prodId;
      let deleteProd = await cartService.deleteProduct(cartId, prodId)
      response.status(200).send(deleteProd);
  }catch(error){
      console.log(error);
      response.status(500).send({error: "No se pudo eliminar el producto", message: error})
  }
});

router.delete("/:cartId", async (request, response) =>{
  try{
      const cartId = request.params.cartId;
      const deleteAllProducts = await cartService.deleteAllProducts(cartId)
      response.status(200).send(deleteAllProducts);
  }catch(error){
      console.log(error);
      response.status(500).send({error: "Error al eliminar los productos", message: error});
  }
});

router.put("/:cartId", async (request, response) =>{
  try{
      const cartId = request.params.cartId;
      let newProd = request.body;
      let updateCart = await cartService.updateCart(cartId, newProd)
      response.status(200).send(updateCart)
  }catch(error){
      consolr.log(error);
      response.status(500).send({error: "Error al actualizar el carrito", message: error});
  }
});

router.put("/:cartId/product/:prodId", async (request, response) =>{
  try{
      const cartId = request.params.cartId;
      const prodId = request.params.prodId;
      const quantity = request.body.quantity;
      let updateQuantity = await cartService.updateQuantity(cartId, prodId, quantity);
      response.status(200).send(updateQuantity);
  }catch(error){
      console.log(error);
      response.status(500).send({error: "No se pudo actualizar la cantidad de los productos", message: error})
  } 
});

export default router;