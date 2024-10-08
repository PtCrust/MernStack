const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        type: String,
    },
})

// Statics signup method
userSchema.statics.signup = async function (email, password) {
    // validation
    if (!email || !password) {
        throw Error('All fields are required')
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character')
    }

    // Check if email already exists in the database
    const exist = await this.findOne({ email })

    if (exist) {
        throw Error('Email already exists')
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

// Statics login method
userSchema.statics.login = async function (email, password) {
    
    if (!email || !password) {
        throw Error('All fields are required')
    }

    const user = await this.findOne({ email })
    
    if(!user){
        throw Error('Invalid Email')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw Error('Invalid Password')
    }
    return user
}



module.exports = mongoose.model('User', userSchema);