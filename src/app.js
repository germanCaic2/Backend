import express, { json } from "express";
import ProductManager from "./ProductManager.js"

const app = express();
const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let products = [];
let getProductByID = [];

const getProducts = async () => products = await productManager.getProducts();
getProducts();

app.get("/products", (request, response) => { response.send(products); });

app.get("/products/:pid", (request, response) => {
  let id = parseInt(request.params.pid)
  if (id <= products.length) {
    const getProductsByID = async (id) => getProductByID = await productManager.getProductById(id);
    getProductsByID(id)
    response.send(getProductByID);
  } else { response.send(products)}
});

app.get("/products:query", (request, response) => {
  let productLimit = []
  let limit = (parseInt(request.query.limit) - 1);
  if (limit <= products.length) {
    for (let i = 0; i <= limit; i++) { productLimit.push(products[i]) }
    response.send(productLimit)
  } else { response.send(products) }
});

const SERVER_PORT = 8080;
app.listen(SERVER_PORT, () => { console.log(`Server running in port ${SERVER_PORT}`); });