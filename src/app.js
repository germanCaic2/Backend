import express from 'express';
import handlebars from 'express-handlebars'
import __dirname from './util.js'
import { Server } from 'socket.io';
import ProductsRouter from './routes/products.router.js'
import CartsRouter from './routes/carts.router.js'
import ProductManager from './ProductManager.js';

const productManager = new ProductManager()
const Products = await productManager.getProducts()

const app = express();

app.engine('handlebars', handlebars.engine())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');

app.use(express.static(__dirname+'/public'))

app.use(`/api/products`, ProductsRouter);
app.use(`/api/carts`, CartsRouter);

app.get(`/`,(req, res)=>{
  res.render('home',{Products:Products[6]})
})

const SERVER_PORT = 8080;
const httpServer = app.listen(SERVER_PORT, () => {
  console.log(`Server running in port ${SERVER_PORT}`);
  console.log(__dirname + "/views")
});

const socketServer = new Server(httpServer);