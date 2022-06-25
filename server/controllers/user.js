//Hashing to store passwords securely
import bcrypt from 'bcryptjs';
//Store user info in browser for some period of time
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
    //Get email and password from request
    const { email, password } = req.body;

    try {
        //Get user from email
        const existingUser = await User.findOne({ email });
        //Check if user exist
        if(!existingUser) {
            return res.status(404).json({ message: "User doesn't exist." });
        }
        //Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials." });
        }
        const token = jwt.sign({ email: existingUser.user, id: existingUser._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong. "});
    }
}

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {
        //Check to see if an account with that email is already signed up
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "User already exist." });
        }
        //Check confirmed password
        if(password !== confirmPassword) {
            return res.status(400).json({ message: "Password does not match." });
        }
        //Create user
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ name: `${firstName} ${lastName}`, email, password: hashedPassword });
        const token = jwt.sign({ email: result.user, id: result._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong. "});
    }
}