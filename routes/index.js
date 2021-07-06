const express = require('express')
const actions=require('../methods/action')
const router = express.Router()
router.get('/',function(req,res){
    res.send('HEllo World')
})
router.get('/dashboard',function(req,res){
    res.send('<h1>Dashboard</h1>')
})

//@desc Adding new user
//@route POST /addusernom 
router.post('/adduser',actions.addNew)
//@desc Authenticating a new user
//@route POST /addusernom 
router.post('/authenticate',actions.authenticate)
//@desc Get Info on a user
//@route GET /addusernom 
router.get('/getdata',actions.getdata)
module.exports=router
