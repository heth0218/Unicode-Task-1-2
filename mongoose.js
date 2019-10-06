const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const Menus=new Schema({
    Name:String,
    Price:Number,
    Veg:Boolean,
    Jain:Boolean,
    Category:String
   });

const AddressSchema=new Schema({
   Street:String,
   Landmark:String,
   City:String,
   Pincode:Number
   });



const RestroSchema=new Schema({
    Name:String,
    Address:AddressSchema,
    Menu:[Menus]

});

const Restro=mongoose.model('restaurant',RestroSchema);

module.exports=Restro;
