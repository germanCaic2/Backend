class Product {
  static id = 0
  constructor(id, title, description, price, thumbnail, code, stock) {
    this.id = Product.id++;
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
    this.productsDirPath = "./database";
    this.productsFilePath = this.productsDirPath + "/products.json";
    this.fileSystem = require("fs");
  }
  fileCreator = async () => {
    await this.fileSystem.promises.mkdir(this.productsDirPath, { recursive: true });
    if (!this.fileSystem.existsSync(this.productsFilePath)) {
      await this.fileSystem.promises.writeFile(this.productsFilePath, "[]");
    }
  }
  addProduct = async (id, title, description, price, thumbnail, stock) => {
    const code = () => { let code = parseInt(Math.random() * 3000); return (code) }
    let newProduct = new Product(id, title, description, price, thumbnail, code(), stock);
    console.log("new user:");
    console.log(newProduct);
    try {
      await this.fileCreator();
      await this.getProducts();
      this.products.push(newProduct);
      console.log("Updated user list: ");
      console.log(this.products);
      await this.fileSystem.promises.writeFile(this.productsFilePath, JSON.stringify(this.products));
    } catch (error) {
      console.error(`Error creating new product: ${JSON.stringify(newProduct)}, error details: ${error}`);
      throw Error(`Error creating new product: ${JSON.stringify(newProduct)},  error details: ${error}`);
    }
  }

  getProducts = async () => {
    try {
      await this.fileCreator();
      let productsFile = await this.fileSystem.promises.readFile(this.productsFilePath, "utf-8");
      console.info("JSON file obtained from file:");
      console.log(productsFile);
      this.products = JSON.parse(productsFile);
      console.log("found products: ");
      console.log(this.products);
      return this.products;
    } catch (error) {
      console.error(`Error consulting users by file, validate the file: ${this.productsFilePath},error detail: ${error}`);
      throw Error(`Error consulting users by file, validate the file: ${this.productsDirPath},error detail: ${error}`);
    }
  }
}

module.exports = ProductManager;