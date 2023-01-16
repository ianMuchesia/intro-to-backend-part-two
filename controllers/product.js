const products = require('../models/products')
const Product = require('../models/products')



const getAllProductsStatic = async (req, res)=>{
    const products = await Product.find({name:"a first wooden table" })
    //throw new Error('testing async error')
    res.status(200).json({products, nbHits:products.length})
}

const getAllProducts = async (req, res)=>{

    const {featured, company } = req.query

    const queryObject = {}

    if(featured){
        queryObject.featured = featured === true? true: false;
    }
    if(company){
        queryObject.company = company
    }

    console.log(queryObject)
    const products = await Product.find(queryObject)
   res.status(200).json({products, nbHits:products.length})
}


module.exports = {
    getAllProducts,getAllProductsStatic,
}