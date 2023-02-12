import express  from "express";
const app = express();
import ProductManager from "./ProductManager.js"
const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getProducts = async () => products = await productManager.getProducts();
getProducts();

app.get("/products", (request, response) => {response.send(products);});

const getProductsByID = async (id) => getProductByID = await productManager.getProductById(id);

app.get("/products/:pid", (request, response) => {
  getProductsByID(parseInt(request.params.pid))
  response.send(getProductByID);
});

app.get("/products:query", (request, response) => {
  let limit = request.query.limit;
  limit ? response.send(products.filter(p => p.id <= limit - 1)) : response.send(products);
});

const SERVER_PORT = 8080;
app.listen(SERVER_PORT, () => { console.log(`Server running in port ${SERVER_PORT}`); });