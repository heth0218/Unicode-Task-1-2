const express=require('express');
const mongoose=require("mongoose");
const bodyParser = require('body-parser');
const router=require("./router");
const app=express();
const modules=require("./config/database");
const socket=require("socket.io");

app.use(bodyParser.json());
app.use(router);

mongoose.connect(modules.database);
mongoose.connection.on("connected",()=>{
    console.log("successfully connected to heth's zomato");
}).catch(err=>{
    console.log({error:err});
});
var server=app.listen(3000,function(){
    console.log("listening to request");
});

app.use(express.static("public"));  

var io=socket(server);

io.on("connection",function(socket){
    console.log("made socket connection",socket.id);

    socket.on("chat",function(data){
        socket.to(data.to).emit('chat', data);
        io.to(socket.id).emit('chat', data);
    });
    socket.on('typing', function(data){
        socket.to(data.to).emit('typing', data);
    });
});
app.listen(4000);

mongoose.Promise=global.Promise;







