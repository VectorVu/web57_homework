const UserModel = require("./user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async(req,res)=>{
    try {
        const{username, password} = req.body;
        const existedUser = await UserModel.findOne({username});
        if(existedUser){
            throw new Error('Username duplicate');
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = await UserModel.create({
            username,
            password:hashPassword
        });
        res.send({
            success:1,
            data:{
                _id: newUser.id,
                username: newUser.username
            }
        })
    } catch (error) {
        res.status(400).send({success:0, message: error.message})
    }
}
const login = async(req,res)=>{
    try {
        const{username, password}= req.body;
        const existedUser = await UserModel.findOne({username});
        if(!existedUser){
            throw new Error('Username or password is wrong');
        }

        const matchPassword = await bcrypt.compare(password, existedUser.password);
        if(!matchPassword){
            throw new Error('Username or password is wrong');
        }
        const data = {
            username: "web@gmail.com",
            userId: existedUser._id
        }
        const token = jwt.sign({
            data,
        },process.env.SECRET_KEY,{
            expiresIn: 60*60*24*3
        })
        
        res.send({
            success:1,
            data:{
                _id:data.userId,
                token
            }
        })

    } catch (error) {
        res.status(400).send({success:0, message: error.message})
    }
}
module.exports ={
    register,
    login
}