import express  from "express";
import ProductManager from "./ProductManager.js"

const app = express();
const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let products = [];
let getProductByID = [];

const getProducts = async () => products = await productManager.getProducts();
getProducts();

app.get("/products", (request, response) => {response.send(products);});

app.get("/products/:pid", (request, response) => {
  const getProductsByID = async (id) => getProductByID = await productManager.getProductById(id);
  getProductsByID(parseInt(request.params.pid))
  response.send(getProductByID);
});

app.get("/products:query", (request, response) => {
  let limit = request.query.limit;
  console.log(limit)
});

const SERVER_PORT = 8080;
app.listen(SERVER_PORT, () => { console.log(`Server running in port ${SERVER_PORT}`); });