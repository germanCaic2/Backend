import CartManager from "./src/cartManager.js";

const test = async () => {
  let cartManager = new CartManager();
  cartManager.fileCreator()
  cartManager.getCart()
  cartManager.addCart()
}

test()