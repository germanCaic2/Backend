const socket = io();
socket.emit("client:message", 'HI I AM A NEW USER CONNECTED ')

socket.emit('client:products', "requier the products")

socket.on('server:productsUp', (data) => {
  console.log(data)
  socket.emit('client:productsUpdate', data)
});

socket.on('server:updateProducts', (data) => {
  if (data) {
    console.log(data);
    console.log("products para actualizar")

  } else {
    console.log(data);
    console.log("products al dia")
    // socket.emit('client:products')
  }
});