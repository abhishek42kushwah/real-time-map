const express = require("express")
const app = express()
const socket_io = require("socket.io")
const http = require("http")
const PORT = 3000
const path = require("path")
app.get("/",function (req,res){
    res.render("index")
})


const server = http.createServer(app);
const io = socket_io(server);
io.on("connection",function(socket){
  socket.on("send-location",function(data){
    io.emit ("received-location",{id:socket.id,...data});
  }
  )
})

// socket.on("disconnect",function(){
// io.emit("user-disconnected",socket.id)
// })

app.set("view engine", "ejs")
app.set(express.static(path.join(__dirname,"public")));


app.listen(PORT,()=>{
    console.log(`App Listen on ${PORT} Number`)
})