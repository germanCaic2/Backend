import CartManager from "./src/cartManager.js";

const test = async () => {
  let cartManager = new CartManager();
  // await cartManager.getCart()
  // await cartManager.addCart()
  // await cartManager.addCart()
  // await cartManager.addCart()
  // await cartManager.addCart()
  await cartManager.getCartById(1)
  let c = { id: 2, products: [] }
  let p = {
    id: 5,
    title: "Vans",
    description: "classic",
    price: 2500,
    thumbnail: "vans-classic.png",
    code: 4240,
    stock: 23,
    category: "SkateBoard",
    status: true
  }
  await cartManager.cartBuilder(c, p)
  await cartManager.cartBuilder(c, p)
  await cartManager.cartBuilder(c, p)
  await cartManager.cartBuilder(c, p)
  // await cartManager.getCart()
}

test()