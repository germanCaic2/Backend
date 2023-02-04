const { response } = require('express');
const http = require('http');
const SERVER_PORT = 8080;

const server = http.createServer((request, response) => {
  response.end("My own server")
});

server.listen(SERVER_PORT, ()=>{
  console.log(`Server running in port ${SERVER_PORT}`)
});