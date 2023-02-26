const socket = io();
socket.emit("message", 'HOLAAAAAAAAAAAAAAAAAAA')
socket.emit('checkJson', "Products")

socket.on('updateJson', (data) => {
  console.log(data)
  socket.emit('checkJson', data )
});