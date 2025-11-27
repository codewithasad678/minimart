const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required"],
        trim : true,
        minLength : [3,"Name must be at least 3 character"]
    },
    phone : {
        type : String
    },
    email : {
        type : String,
        required :  [true, "email is required"],
        unique : true,
        lowercase : true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid']
    },
    password : {
        type : String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/,
        'Password must contain uppercase, lowercase, number, and special character'
        ]
    },
    role : {
        type : String,
        default : "user"
    },
    refreshToken : {
        type : String
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

// Pre-save hook to hash password
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return; // Only hash if password changed
    try {
        const salt = await bcrypt.genSalt(10); // generate salt
        this.password = await bcrypt.hash(this.password, salt); // hash password
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model("users",userSchema);

module.exports = User;