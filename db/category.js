const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    categoryid: {
        type: Number
    },
    price: {
        type: Number
    },
    discription: {
        type: String
    },
    slug: {
        type: String,
        unique:true
    }

})

module.exports = mongoose.model('categorys', categorySchema);