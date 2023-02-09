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

app.get("/products/:id", (request, response) => {
  const product = products.find(p => p.id == request.params.id);
  product ? response.send(product) : response.send({ message: "Product not found" });
});

const SERVER_PORT = 8080;
app.listen(SERVER_PORT, () => {
  console.log(`Server running in port ${SERVER_PORT}`);
});