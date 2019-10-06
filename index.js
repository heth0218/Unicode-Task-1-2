const express=require('express');
const mongoose=require("mongoose");
const bodyParser = require('body-parser');
const router=require("./router");
const app=express();
const modules=require("./config/database");

app.use(bodyParser.json());
app.use(router);

mongoose.connect(modules.database);
mongoose.connection.on("connected",()=>{
    console.log("successfully connected to heth's zomato");
}).catch(err=>{
    console.log({error:err});
});


mongoose.Promise=global.Promise;


app.listen(4000,function(){
    console.log("listening");
});
