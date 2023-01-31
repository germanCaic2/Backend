const ProductsManager = require("./ProductManager");

const test = async () => {
  let productsManager = new ProductsManager();
  productsManager.addProduct("id", "adidas", "description", "price", "thumbnail", "stock")
  productsManager.addProduct("id", "nike", "description", "price", "thumbnail", "stock")
  productsManager.addProduct("id", "vans", "description", "price", "thumbnail", "stock")
  productsManager.getProducts()
}

test()