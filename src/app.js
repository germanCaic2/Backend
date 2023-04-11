import express from 'express';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo'
import handlebars from 'express-handlebars';
import session from 'express-session'
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
// import FileStore from 'session-file-store';
import __dirname from './util.js';
import ProductManager from './dao/Dao/ProductManager.js';
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import ViewsRouter from './routes/views.router.js';
import CookieRouter from './routes/cookie.router.js'
import usersViewRouter from './routes/users.views.router.js'
import sessionsRouter from './routes/sessions.router.js'

// const fileStorage = FileStore(session)
const app = express();
const MONGO_URL = 'mongodb+srv://germanCaiced6:123@coderbackend.yddnh5p.mongodb.net/ecommerce?retryWrites=true&w=majority';
const SERVER_PORT = 8080;

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
  // store: new fileStorage({path: "./sessions", retries: 0}),
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 30,
  }),
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

//Middleware passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use(`/api/products`, ProductsRouter);
app.use(`/api/carts`, CartsRouter);
app.use(`/api/cookie`, CookieRouter);
app.use(`/api/session`, sessionsRouter);
app.use(`/views`, ViewsRouter);
app.use(`/users`, usersViewRouter);

//server init
const httpServer = app.listen(SERVER_PORT, () => {
  console.log(`Server running in port ${SERVER_PORT}`);
  console.log(__dirname);
});

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
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