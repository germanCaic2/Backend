import CartManager from "./src/cartManager.js";

const test = async () => {
  let cartManager = new CartManager();
  // await cartManager.getCart()
  // await cartManager.addCart()
  // await cartManager.addCart()
  // await cartManager.getCartById(2)
  let cart = { id: 0, products: [] }
  let product = {
    id: 4,
    title: "Vans",
    description: "classic",
    price: 2500,
    thumbnail: "vans-classic.png",
    code: 4240,
    stock: 23,
    category: "SkateBoard",
    status: true
  }
  await cartManager.cartBuilder(cart, product)
  await cartManager.cartBuilder(cart, product)
  await cartManager.cartBuilder(cart, product)
  await cartManager.cartBuilder(cart, product)
}

test()