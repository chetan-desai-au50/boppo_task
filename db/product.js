const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type: String
    },
    description:{
        type: String,
    }
})

module.exports=mongoose.model('products',productSchema);