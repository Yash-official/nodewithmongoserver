var User =require('../models/user')
var jwt=require('jwt-simple')
var config=require('../.config/dbconfig')

var functions={
    addNew:function(req,res){
        if((!req.body.fullname)||(!req.body.password)||(!req.body.phonenumber||(!req.body.email))){
            res.json({success:false,msg:'Enter all fields'})
        }
        else{
            var newUser=User({
                fullname:req.body.fullname,
                password:req.body.password,
                email:req.body.email,
                phonenumber:req.body.phonenumber,
            });
            newUser.save(function(err,newUSer){
                if(err){
                    res.json({success:false,msg:'Failed to save'})
                }
                else
                {
                    res.json({success:true,msg:'Succesfully saved'})
                }
            })
        }
    },
    authenticate:function(req,res){

        User.findOne(
            {email:req.body.email},
            function(err,user){
                if(err)throw err
                if(!user){
                    res.status(403).send({succes:false,msg:'Authentication failed user not found'})
                }
                else
                {
                    user.comparePassword(req.body.password,function(err,isMatch)
                    {
                        if(isMatch&&!err){
                            var token=jwt.encode(user,config.secret)
                            res.json({success:true,token:token})
                        }
                        else
                        {
                            return res.status(403).send({success:false,msg:'Wrong Password'})
                        }
                    })
                }
            }
            )
    },
    getdata:function(req,res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0]==='Bearer'){
            var token=req.headers.authorization.split(' ')[1]
            var decodetoken=jwt.decode(token,config.secret)
            return res.json({success:true,fullname:decodetoken.fullname,email:decodetoken.email,phonenumber:decodetoken.phonenumber})
        }
        else{
            return res.json({succes:false,msg:'No Headers'})
        }
    }
}

module.exports=functions