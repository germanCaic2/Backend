import fs from 'fs'

class Cart {
  constructor(id) {
    this.id = id;
    this.products = new Array;
  }
}

class CartManager {
  static cartsDirPath = "./database";
  static cartsFilePath = CartManager.cartsDirPath + "/carts.json";

  constructor() {
    this.cart = new Array;
  }
  fileCreator = async () => {
    await fs.promises.mkdir(CartManager.cartsDirPath, { recursive: true });
    if (!fs.existsSync(CartManager.cartsFilePath)) {
      await fs.promises.writeFile(CartManager.cartsFilePath, "[]");
    }
  }

  addCart = async () => {
    await this.getCart();
    let id = this.cart.length
    let newCart = new Cart(id);
    console.log(newCart);
    this.cart.push(newCart);
  }

  getCart = async () => {
    try {
      await this.fileCreator();
      let cartFile = await fs.promises.readFile(CartManager.cartsFilePath, "utf-8");
      console.log("JSON file obtained from file:");
      console.log(cartFile);
      this.cart = JSON.parse(cartFile);
      console.log(this.cart);
      return this.cart;
    } catch (error) {
      console.error(`Error consulting the carts by file, validate the file: ${this.cart},error detail ${error}`);
      throw Error(`Error consulting the carts by file, validate the file: ${this.cart}, error detail ${error}`);
    }
  }
}

export default CartManager;