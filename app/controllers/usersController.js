const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const usersController = {}

usersController.register = (req,res)=>{
    console.log('entered usersController register')
    const body = req.body
    const user = new User(body)
    bcrypt.genSalt()
    .then(salt=>{
        console.log('salt',salt)
       bcrypt.hash(user.password,salt)
          .then((encrypted)=>{
             user.password = encrypted
              user.save()
              .then((user)=>{
                  res.json(user)
               })
              .catch(err=>{
                  res.json(err)
              })
         })
         .catch(err=>{
             res.json(err)
         })
    })
    .catch(err=>{
        res.json(err)
    })
 }

usersController.login = function(req,res){
    const body = req.body
    const secretKey = 'dct123'
    User.findOne({email : body.email })
    .then((user)=>{
        if(!user){
            res.json('Invalid email or password')
        }
        bcrypt.compare(body.password, user.password)
         .then(match=>{
              if(match){
                  const tokenData = {
                            id : user._id,
                      username : user.username,
                         email : user.email     
                  }
                const token= jwt.sign(tokenData,  secretKey, {expiresIn : '1h'})
                  if(token){
                      res.json({
                          token : `Bearer ${token}`
                        })
                  }else {
                      res.json({
                          error : 'Invalid email or password'
                      })
                  }
              }
         })
     })
    .catch((err)=>{ 
        res.json(err)
    })
}

usersController.account = (req,res)=>{
      res.json(req.user)
}

module.exports = usersController