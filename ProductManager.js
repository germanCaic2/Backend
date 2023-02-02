class Product {
  static id = 0;
  static code = () => parseInt(Math.random() * 10000);
  constructor(title, description, price, thumbnail, stock) {
    this.id = Product.id++;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = Product.code();
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

  addProduct = async (title, description, price, thumbnail, stock) => {
    let newProduct = new Product(title, description, price, thumbnail, stock);
    console.log("Creating new product:");
    console.log(newProduct);
    try {
      await this.fileCreator();
      this.products.push(newProduct);
      console.log("Updating products list:");
      console.log(this.products);
      await this.fileSystem.promises.writeFile(this.productsFilePath, JSON.stringify(this.products));
    } catch (error) {
      console.error(Error`Creating new product" ${JSON.stringify(newProduct)}, error detail: ${error}`);
      throw Error(Error`Creating new product:" ${JSON.stringify(newProduct)}, error detail: ${error}`);
    }
  }

  getProducts = async () => {
    try {
      await this.fileCreator();
      let productsPath = await this.fileSystem.promises.readFile(this.productsFilePath, "utf-8");
      console.info("JSON file obtained from file:");
      console.log(productsPath);
      this.products = JSON.parse(productsPath);
      console.log("Products not found:");
      console.log(this.products);
      return this.products;
    } catch (error) {
      console.error(`Error consulting the products by file, validate the file: ${this.products},error detail ${error}`);
      throw Error(`Error consulting the products by file, validate the file: ${this.products}, error detail ${error}`);
    }

  }

  getProductById = async (id) => {
    await this.getProducts();
    const productId = this.products.find(p => p.id == id);
    if (productId) {
      console.log("Product found:");
      console.log(productId);
    } else {
      console.warn("Product not found by id: " + productId);
    }
  }

  updateProduct = async (id, newProduct) => {
    await this.getProducts();
    const updateProduct = this.products.map((prod) => {
      if (prod.id === id) { return { ...prod, ...newProduct }; } else { return prod; }
    });
    this.products = updateProduct;

    await this.fileSystem.promises.writeFile(this.productsFilePath, JSON.stringify(this.products));
    console.log(this.products);
  }

  deleteProduct = async (id) => {
    await this.getProducts();
    if (this.products.find((prod) => prod.id === id)) {
      const delet = this.products.indexOf(id);
      console.warn(delet)
      this.products.splice(delet, 1);
      console.log("se elimino el producto");
      console.log(this.products);
      await this.fileSystem.promises.writeFile(this.productsFilePath, JSON.stringify(this.products));
    }
  }
}
module.exports = ProductManager;