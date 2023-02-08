const express = require('express');
const ProductManager = require('./ProductManager');
let productManager = new ProductManager();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const products = require("../database/products.json");
app.get("/products", (request, response) => { response.send(products) })

app.get("/products/:id", (request, response) => {
  const prod = products.find(p => p.id == request.params.id)
  if (prod) { response.send(prod) } response.send({ message: "User not found" });
})

const SERVER_PORT = 8080;
app.listen(SERVER_PORT, () => {
  console.log(`Server running in port ${SERVER_PORT}`)
});