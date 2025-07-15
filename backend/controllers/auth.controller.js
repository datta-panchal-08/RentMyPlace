import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "all fileds are required!",
                success: false
            });
        }

        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(400).json({
                message: "user is already registered!",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "Signup Successful!",
            success: true,
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log("Signup Error : ", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}


export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "all fileds are required!",
                success: false
            });
        }

        const userExists = await User.findOne({ email: email });

        if (!userExists) {
            return res.status(404).json({
                message: "user not found!",
                success: false
            });
        }

        const passwordMatch =  bcrypt.compare(password,userExists.password);
        
        if(!passwordMatch){
            return res.status(401).json({
                message:"Invalid Password",
                success:false
            });
        }

        const payload = {
            username:userExists.username,
            id:userExists._id,
            email:userExists.email
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"1d",
        });

        res.cookie("token",token,{
            maxAge:1*24*60*60*1000,
            httpOnly:true,
            secure:true,
            sameSite:"None"
        });

        res.status(200).json({
            message:"Login successfull!",
            success:true,
            user:{
                _id:userExists._id,
                email:userExists.email,
                username:userExists.username
            },
            token
        })

    } catch (error) {
        console.log("Login Error : ",error);
        res.status(500).json({
            message:"Internal Server Error",
            success:false
        })
    }
}

export const logout = async (req, res) => {
  try {
     res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    res.status(200).json({
      message: "Logout successful!",
      success: true,
    });
  } catch (error) {
    console.log("Logout Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
