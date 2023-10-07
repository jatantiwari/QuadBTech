const express = require('express');
const User = require('../models/user');
const router = express.Router();
const fs = require('fs');
const {getUserById,updateMiddleware} = require('../middleware/user');

router.get('/details/:user_id',getUserById,async(req, res)=>{
    try{
       
        const user = req.user;
        res.json(user);
        
    }catch(error) {
        res.send(error.message)
    }
})

router.put('/update/:user_id',updateMiddleware,async(req, res)=>{
    const updatedUser = req.updatedUser;
    res.json(updatedUser);
})

router.get('/image/:user_id',async(req,res)=>{
    const { user_id } = req.params;
        try {
        const user = await User.findOne({ user_id });
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        if (!user.user_image) {
          return res.status(404).json({ message: 'User image not found' });
        }
        let imagePath = "./image.png"
        
        fs.writeFile(imagePath, user.user_image, (error) => {
            if (error) {
              console.error('Error writing image file:', error);
              res.send("cannot copy")
            } else {
              console.log('Image file saved successfully at:', imagePath);
              res.send(user.user_image)
            }
        })
    }
    catch (err) {
        res.send(err.message)
    }
      
        
    
})

router.post('/insert',async(req,res)=>{
    try{let {user_id,user_name,user_email,user_password,user_image,total_orders} = req.body;
    const imageBuffer = fs.readFileSync(user_image);
    let user = await User.create({user_id,user_name,user_email,user_password,user_image:imageBuffer,total_orders})
    if(user){
        res.send("user created");
    }
    else{
        res.send("Unable to create user")
    }}
    catch(err){
        res.send(err.message)
    }
})

router.delete('/delete/:user_id',async(req,res)=>{
    
        let user_id = req.params.user_id
        let user = await User.deleteOne({user_id: user_id})
        if(user){
            res.send("user deleted succesfully")
        }
        else{
            res.send("Unable to delete user")
        }
} )











module.exports = router;