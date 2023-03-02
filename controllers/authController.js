import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registering a new user
export const registerUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
    const newUser = new User(req.body);
    const { email } = req.body;
    try {
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res
          .status(400)
          .json({ message: "username is already registered" });
      }
      const user = await newUser.save();
      const token = jwt.sign(
        {
          email : user.email,
          id: user._id,
        },
        'TOPKARTSECRET',
        { expiresIn: "2h" }
      );
      res.status(201).json({user:user,token:token})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };




  //login User

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email: email });
  
      if (user) {
          
        const validity = await bcrypt.compare(password, user.password);
  
        if (!validity) {
          res.status(400).json("wrong password");
        } else {
        
          const token = jwt.sign(
            {
                email : user.email,
                id: user._id,
            },
            'TOPKARTSECRET',
            { expiresIn: "2h" }
          );
          res.status(200).json({user:user,token:token});
        }
      } else {
        res.status(404).json("User does not exist");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
