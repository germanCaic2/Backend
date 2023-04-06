import express from 'express';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import session from 'express-session'
import cookieParser from 'cookie-parser';
import __dirname from './util.js';
import ProductManager from './dao/Dao/ProductManager.js';
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import ViewsRouter from './routes/views.router.js';
import CookieRouter from './routes/cookie.router.js'

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
//cookie
app.use(cookieParser('secret'));
//Session management
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Routers
app.use(`/api/products`, ProductsRouter);
app.use(`/api/carts`, CartsRouter);
app.use(`/api/views`, ViewsRouter);
app.use(`/api/cookie`, CookieRouter);

const SERVER_PORT = 8080;
const httpServer = app.listen(SERVER_PORT, () => {
  console.log(`Server running in port ${SERVER_PORT}`);
  console.log(__dirname);
});

const connectMongoDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://germanCaiced6:123@coderbackend.yddnh5p.mongodb.net/ecommerce?retryWrites=true&w=majority');
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("cant connect to MongoDB" + error);
    process.exit();
  }
};
connectMongoDB();

const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
  console.log('new user conected:', socket.id);

  socket.on('client:message', msg => { console.log(msg); });

  socket.on('client:products', async () => {
    const Products = await productManager.getProducts();
    socket.emit('server:products', Products);
  });
});