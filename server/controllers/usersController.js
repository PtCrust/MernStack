const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config();


// Create Token Function 
const createTokenFunction = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
}

// Login User
const loginUser = async (req, res) => {
    // res.json({ mssg: "login user" })
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password)

        // create token 
        const token = createTokenFunction(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// Sign up User
const signUpUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.signup(email, password)

        // create token 
        const token = createTokenFunction(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports =
{
    loginUser,
    signUpUser,
}