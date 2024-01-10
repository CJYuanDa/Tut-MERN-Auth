const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// create static method on the model
userSchema.statics.signup = async function(email, password) {
    // validation
    if (!email || !password) throw Error('All fields must be filled.');
    if (!validator.isEmail(email)) throw Error('Email is not valid.');
    // { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, 
    // minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, 
    // pointsForContainingLower: 10, pointsForContainingUpper: 10, 
    // pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
    if (!validator.isStrongPassword(password, { minSymbols: 0})) throw Error('Password not strong enough.');

    const exist = await this.findOne({ email });
    if (exist) throw Error('The email is registered.');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash });
    return user;
};

module.exports = mongoose.model('User', userSchema);