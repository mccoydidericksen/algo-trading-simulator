const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    userCreated: {
        type: Date,
        default: Date.now
    },
    results: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Results'
        }
    ]
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePasswords = async function (
    candidatePassword,
    hashedPassword
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  };

const User = model('User', userSchema);

module.exports = User;