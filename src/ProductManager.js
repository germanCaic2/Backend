const fs = require("fs");
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
  static productsDirPath = "../database";
  static productsFilePath = ProductManager.productsDirPath + "/products.json";
  constructor() {
    this.products = new Array();
  }

  fileCreator = async () => {
    await fs.promises.mkdir(ProductManager.productsDirPath, { recursive: true });
    if (!fs.existsSync(ProductManager.productsFilePath)) {
      await fs.promises.writeFile(ProductManager.productsFilePath, "[]");
    }
  }

  addProduct = async (title, description, price, thumbnail, stock) => {
    let newProduct = new Product(title, description, price, thumbnail, stock);
    console.log(`Creating new product:`);
    console.log(newProduct);
    try {
      await this.fileCreator();
      this.products.push(newProduct);
      console.log("Updating products list:");
      console.log(this.products);
      await fs.promises.writeFile(ProductManager.productsFilePath, JSON.stringify(this.products));
    } catch (error) {
      console.error(Error`Creating new product" ${JSON.stringify(newProduct)}, error detail: ${error}`);
      throw Error(Error`Creating new product:" ${JSON.stringify(newProduct)}, error detail: ${error}`);
    }
  }

  getProducts = async () => {
    try {
      await this.fileCreator();
      let productsPath = await fs.promises.readFile(ProductManager.productsFilePath, "utf-8");
      console.info("JSON file obtained from file:");
      console.log(productsPath);
      this.products = JSON.parse(productsPath);
      console.log(this.products);
      return this.products;
    } catch (error) {
      console.error(`Error consulting the products by file, validate the file: ${this.products},error detail ${error}`);
      throw Error(`Error consulting the products by file, validate the file: ${this.products}, error detail ${error}`);
    }
  }

  getProductById = async (id) => {
    try {
      await this.getProducts();
      const productId = this.products.find(p => p.id == id);
      if (productId) {
        console.log("Product found by ID:");
        console.log(productId);
        return productId
      } else {
        console.warn("Product not found by id: " + productId + id);
      }
    } catch (error) {
      console.error(`Error consulting the products by specific ID: ${this.id}, error detail ${error}`);
      throw Error(`Error consulting the products by specific ID: ${this.id}, error detail ${error}`);
    }
  }

  updateProduct = async (id, newProduct) => {
    try {
      await this.getProducts();
      const updateProduct = this.products.map((prod) => {
        if (prod.id === id) { return { ...prod, ...newProduct }; } else { return prod; }
      });
      this.products = updateProduct;
      await fs.promises.writeFile(ProductManager.productsFilePath, JSON.stringify(this.products));
      console.log(`Product whit ID: ${id} was updated.`)
      console.log(this.products);
    } catch (error) {
      console.error(`Error updating the product by specific ID: ${this.id}, error detail ${error}`);
      throw Error(`Error updating the product by specific ID: ${this.id}, error detail ${error}`);
    }
  }

  deleteProduct = async (id) => {
    try {
      await this.getProducts();
      if (this.products.find((prod) => prod.id === id)) {
        const delet = this.products.indexOf(id);
        console.warn(delet)
        this.products.splice(delet, 1);
        console.log("the product whit Id: " + id + " was deleted.");
        console.log(this.products);
        await fs.promises.writeFile(ProductManager.productsFilePath, JSON.stringify(this.products));
      }
    } catch (error) {
      console.error(`Error deleting  the product by specific ID: ${this.id}, error detail ${error}`);
      throw Error(`Error deleting  the product by specific ID: ${this.id}, error detail ${error}`);
    }
  }
}

module.exports = ProductManager;