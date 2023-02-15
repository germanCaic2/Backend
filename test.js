import ProductManager from "./src/ProductManager.js";

const test = async () => {
  let productManager = new ProductManager();
  productManager.getProducts()
  productManager.addProduct("title", "description", "price", "status", "stock", "category", "thumbnail")
}

test()