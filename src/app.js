const express = require('express');
const app = express();
const ProductManager = require('./ProductManager');
const productManager = new ProductManager;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getProducts = async () => products = await productManager.getProducts();
getProducts()

app.get("/products", (request, response) => {
  response.send(products)
});

app.get("/products/:pid", (request, response) => {
  const product = products.find(p => p.id == request.params.pid);
  product ? response.send(product) : response.send({ message: "Product not found" });
});

app.get("/product/query", (request, response) => {
  let limit = request.query.limit;
  if(limit) {
    response.send(products.filter(p => p.id <= limit -1))
  }
});

const SERVER_PORT = 8080;
app.listen(SERVER_PORT, () => {
  console.log(`Server running in port ${SERVER_PORT}`);
});