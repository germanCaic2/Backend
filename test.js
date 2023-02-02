const ProductManager = require("./ProductManager");

const test = async () => {
  let productManager = new ProductManager();
  productManager.fileCreator();
  productManager.addProduct("adidas", "sport", 2400, "adidas-sport.png", 22);
  productManager.addProduct("nike", "sb", 2900, "nike-sb.png", 20);
  productManager.addProduct("vans", "classic", 2500, "vans-classic.png", 23);
  productManager.getProductById(1);
  
  // ObjetoModificado para actualizar
  const ObjUpdated = {
    title: "modicado",
    description: "modicado",
    price: "modicado",
    thumbnail: "modicado",
    stock: "modicado"
  }
  productManager.updateProduct(1, ObjUpdated)

  productManager.deleteProduct(2)
}

test()