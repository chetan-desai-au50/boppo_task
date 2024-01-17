const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("./db/config");
const Product = require('./db/product');
const Category = require('./db/category')

app.use(express.json());


//Get all categories 
app.get("/category/all", async (req, res) => {
    let products = await Product.find();

    if (products.length > 0) {
        res.send(products)
    } else {
        res.send("NO category data FOUND..;) ")
    }
})


//Create category 
app.post('/category/add', async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
})


//Create CRUD of Product Data
app.post('/product/add', async (req, res) => {

    const productName = req.body.name;
    console.log(productName)
    const productdata = await Category.findOne({ name: productName });
    console.log(productdata)
    if (productdata) {
        res.send("the product is already added...")
    } else{
        let category = new Category(req.body);
        let result = await category.save();
        res.send(result)
    }


})


//Get by handle
app.get('/product/:getByHandle', async (req, res) => {
    let result = await Category.findOne({ _id: req.params.getByHandle });
    res.send(result)

})

//Update product
app.put('/product/update/:productId', async (req, res) => {

    const productName = req.body.name;
    console.log(productName)
    const productdata = await Category.findOne({ name: productName });
    console.log(productdata)
    if (productdata) {
        res.send("the product is already added...")
    } else{

    let result = await Category.updateOne(
        { _id: req.params.productId },
        {
            $set: req.body
        }
    )
    console.log(result)
    res.send(result)}
})


//Delete product 
app.delete('/product/delete/:productId', async (req, res) => {
    const result = await Category.deleteOne({ _id: req.params.productId });
    res.send(req.params.productId);
})

//Get all products
app.get('/products/products', async (req, res) => {
    let data = await Category.find();
    // res.send(data)
    console.log(data)
    if (data.length > 0) {
        res.send(data)
    } else {
        res.send("NO products FOUND..;) ")
    }
})


//add multiple data
app.post("/product./addProducts", async (req, res) => {
    let data = req.body;
    console.log(data)
    let result = await Category.insertMany(data);
    res.send(result)
})




app.listen(port, () => {
    console.log(`server is running on port ${port}...`)
})