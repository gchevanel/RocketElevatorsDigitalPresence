// index.js

const http = require('http')
const port = 3000

const requestHandler = (request, res) => {
  console.log(request.url)
  res.end('Hello Nodde.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})