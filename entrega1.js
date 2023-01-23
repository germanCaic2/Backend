const code = () => { let id = parseInt(Math.random() * 10000); return (id); }

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.products = new Array();
  }
  getProduct = () => { return this.products }

  addProduct = (title, description, price, thumbnail, code, stock) => {
    let newProduct = new Product(title, description, price, thumbnail, code, stock);
    let error = `El elemento ${newProduct.title} con la ID: ${newProduct.code} ya existe`

    if (!this.products.some(product => product.code === newProduct.code)) {
      this.products.push(newProduct)
    } else { console.log(error); }
  }

  getProductById = (ID) => {
    let seach = this.products.find(prod => prod.code === ID)
    return seach
  }
}
let productManager = new ProductManager();
console.log(productManager.getProduct());

productManager.addProduct("Drunk sb", "Shoes", 2300, "nike.jpg", 11111, 20);
productManager.addProduct("adidas sb", "Shoes", 2000, "adidas.jpg", code(), 20);
productManager.addProduct("Balenciaga", "Shoes", 2300, "balenciaga.jpg", code(), 24);
productManager.addProduct("Drunk sb (elemento repetido)", "Shoes", 2300, "nike.jpg", 11111, 20);

console.log("-----------------------------------------------------------")
console.log(productManager.getProduct());

console.log("-----------------------------------------------------------")
console.log(productManager.getProductById(11111));

