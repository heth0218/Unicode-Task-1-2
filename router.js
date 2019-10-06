const express=require("express");
const router=express.Router();
const Restro=require("./mongoose");
const jwt=require("jsonwebtoken");
const User=require("./user");
const config=require("./config/database");
const bcrypt=require("bcryptjs");



//GET restro by ID
router.get('/restro/:id',test,async(req,res)=>{
    const restro=await Restro.find({_id:req.params.id});
        res.send(restro);
    });
//GET all restros
router.get('/restro',test,async(req,res)=>{
        const restro=await Restro.find({});
            res.send(restro);
        });

//PUT restro by ID
router.put('/restro/:id',test,async(req,res)=>{
await Restro.findByIdAndUpdate({_id:req.params.id},req.body);
var restro=await Restro.findOne({_id:req.params.id});
    res.send(restro);
});

//POST restro by ID
router.post('/restro',test,async(req,res)=>{
const data=await Restro.create(req.body);
   res.send(data);
});

//DELETE restro by ID
router.delete('/restro/:id',test,async(req,res)=>{
let restro=await Restro.findByIdAndRemove({_id:req.params.id});
res.send(restro);
});

//registering new users
    router.post("/register",(req,res)=>{
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(hash){
                let newUser= new User({
                    name:req.body.name,
                    email:req.body.email,
                    username:req.body.username,
                    password:hash
                
                    }).save().then(data=>res.send(data));
                }
                else{
                    res.send({error:err});
                }
        });
    });

//To generating a new token for our already registered User
    router.post('/login',(req,res)=>{
        const username=req.body.username;
          User.getUserByUsername(username,(err,user)=>{
            if(err) throw err;
            if(!user){
                res.send("user not found");
            }
            else{
               bcrypt.compare(req.body.password,user.password,(err,resp)=>{
                if(resp){
                    const token=jwt.sign({user},config.secret,{
                        expiresIn:24*60*60 
                    });
                    res.send({
                       token:token,
                       token_lifetime:"1 day",//specifying lifetime to the user
                        user:{
                            name:user.name,
                            username:user.username,
                            email:user.email,
                            }
                            });
                        }
                        else res.send({
                                error:err
                            });
                    });
                }
            });
        });

//Test to authenticate the user with the JWT token
    function test(req,res,next){
            const bearerHead = req.headers.authorization;
        if(typeof bearerHead !== 'undefined') {//Token has a defaullt Bearer attached which is to be removed
            const bearer = bearerHead.split(' ');
            const bearerLessToken = bearer[1];
            console.log(bearerLessToken);
        
    jwt.verify(bearerLessToken,config.secret);
    next();
         }
    }


module.exports=router;