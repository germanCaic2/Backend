import express from 'express';
import ProductsRouter from './routes/products.router.js'
import CartsRouter from './routes/carts.router.js'
import __dirname from './util.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/api/products` , ProductsRouter)
app.use(`/api/carts` , CartsRouter)

const SERVER_PORT = 8080;
app.listen(SERVER_PORT, () => { console.log(`Server running in port ${SERVER_PORT}`); });