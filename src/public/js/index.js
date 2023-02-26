const socket = io();


socket.emit("m", 'HOLAAAAAAAAAAAAAAAAAAA')
socket.emit('checkJson', 'Products')

socket.on('updateJson', (data) => {
  console.log(data)
});