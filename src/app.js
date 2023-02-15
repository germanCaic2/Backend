import express from 'express';
import ProductsRouter from './routes/products.router.js'
import CartsRouter from './routes/carts.router.js'
import __dirname from './util.js'

// import ProductManager from "./ProductManager.js"
// const productManager = new ProductManager();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/api/products` , ProductsRouter)
app.use(`/api/carts` , CartsRouter)

const SERVER_PORT = 8080;
app.listen(SERVER_PORT, () => { console.log(`Server running in port ${SERVER_PORT}`); });

// let products = [];

// const getProducts = async () => products = await productManager.getProducts();
// getProducts();

// app.get("/products", (request, response) => { response.send(products); });

// let getProductByID = [];
// app.get("/products/:pid", (request, response) => {
//   let id = parseInt(request.params.pid)
//   if (id <= products.length) {
//     const getProductsByID = async (id) => getProductByID = await productManager.getProductById(id);
//     getProductsByID(id)
//     response.send(getProductByID);
//   } else { response.send(products)}
// });

// app.get("/products:query", (request, response) => {
//   let productLimit = []
//   let limit = (parseInt(request.query.limit) - 1);
//   if (limit <= products.length) {
//     for (let i = 0; i <= limit; i++) { productLimit.push(products[i]) }
//     response.send(productLimit)
//   } else { response.send(products) }
// });