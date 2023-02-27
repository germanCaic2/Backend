import express from 'express';
import __dirname from './util.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import ViewsRouter from './routes/views.router.js';
import ProductManager from './ProductManager.js';


const app = express();
const productManager = new ProductManager();
productManager.getProducts();

// handlebars use
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');
// JSON encode
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// public folder
app.use(express.static(__dirname + '/public'));
// Routers
app.use(`/api/products`, ProductsRouter);
app.use(`/api/carts`, CartsRouter);
app.use(`/api/views`, ViewsRouter);

const SERVER_PORT = 8080;
const httpServer = app.listen(SERVER_PORT, () => {
  console.log(`Server running in port ${SERVER_PORT}`);
  console.log(__dirname);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
  console.log("new user conected:", socket.id);

  socket.on("client:message", data => {
    console.log("-------------------------------")
    console.log(data);
  });

  socket.on('client:products', async (data) => {
    console.log(data)
    socket.emit('server:productsUp', await productManager.products)
  });

  socket.on('client:productsUpdate', async (data) => {
    // await productManager.getProducts()
    if (JSON.stringify(data) !== JSON.stringify(await productManager.products)) {
      socket.emit('server:updateProducts', true);
    } else {
      console.log("Productos iguales, no hay actualizaciones")
      socket.emit('server:updateProducts', false)
    }
  });
});