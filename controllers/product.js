//const products = require('../models/products')
const Product = require('../models/products')



const getAllProductsStatic = async (req, res)=>{


    const products = await Product.find({}).sort('-name price')//if pname matches it is going to sort price first
    //throw new Error('testing async error')
    res.status(200).json({products, nbHits:products.length})
}
const getAllProducts = async (req, res)=>{
    // Destructuring the query object to extract the values of featured, company, name and sort
    const { featured, company, name ,sort } = req.query

    // Initializing an empty queryObject
    const queryObject = {}

    // Check if featured query parameter is present
    if(featured){
        // If present, set the featured value to true or false based on the query parameter value
        queryObject.featured = featured === "true"? true: false;
    }
    // Check if company query parameter is present
    if(company){
        // If present, set the company value in the queryObject
        queryObject.company = company
    }
    // Check if name query parameter is present
    if(name){
        // If present, set the name value in the queryObject with a regex option
        queryObject.name = {$regex: name, $options:'i'}
    }

    // Initialize the result object with the find method and the queryObject
    let result = Product.find(queryObject)

    // Check if sort query parameter is present
    if(sort){
        // If present, split the sort parameter by ',' and join the resulting array with ' '
        const sortList = sort.split(',').join(' ')
        // Sort the result object using the sortList
        //sort method being used is the mongoose on not javascript one
        result = result.sort(sortList)
    }

    // Wait for the result to be resolved
    const products = await result

    // Send the products and the number of hits as a response
    res.status(200).json({products, nbHits:products.length})
}



module.exports = {
    getAllProducts,getAllProductsStatic,
}