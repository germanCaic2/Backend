const ProductManager = require("./src/ProductManager");

const test = async () => {
  let productManager = new ProductManager();
  productManager.getProducts()
}

test()