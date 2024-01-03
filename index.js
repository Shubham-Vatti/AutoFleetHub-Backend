const http = require('http');
const app=require('./Server');
const server=http.createServer(app);
const PORT=process.env.PORT || 7000;

server.listen(PORT,()=>{
    console.log('listening on port')
})
