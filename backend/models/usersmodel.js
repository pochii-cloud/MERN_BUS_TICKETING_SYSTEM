const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,                   
            required: true
        },
        phone: {
            type: String, 
            unique:true,                    
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false,
          },
        email: {
            type: String,
            unique:true,                
            required: true
            
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    }
);

module.exports = mongoose.model("users",userSchema);

