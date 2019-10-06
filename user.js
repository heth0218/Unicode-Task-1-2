const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const UserSchema =new Schema({
    name:String,
    email:String,
    username:String,
    password:String
});
var User=module.exports=mongoose.model("user",UserSchema);

module.exports.getUserByUsername=function(username,callback){
    User.findOne({username:username},callback);
};
