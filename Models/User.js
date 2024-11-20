const mongoose=require('mongoose');
const UserSchemea=mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ['admin', 'user'],
        required: true
    },
});

module.exports=mongoose.model("User",UserSchemea);