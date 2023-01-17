//const products = require('../models/products')
const Product = require('../models/products')



const getAllProductsStatic = async (req, res)=>{


    const products = await Product.find({price:{$gt:30}}).sort('price').select('name price').limit(20)//if pname matches it is going to sort price first
    //throw new Error('testing async error')
    res.status(200).json({products, nbHits:products.length})
}
const getAllProducts = async (req, res)=>{
    // Destructuring the query object to extract the values of featured, company, name and sort
    const { featured, company, name ,sort , fields, numericFilter} = req.query

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
    if(numericFilter){
        const operatorMap ={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$gte',
        }
        //regular expression magic
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilter.replace(regEx, (match)=>`-${operatorMap[match]}-`)

        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item)=>{
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
        console.log(filters)
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
    }else{
        result = result.sort('createAt')
    }

    if(fields){
        const fieldLists = fields.split(',').join(" ")
        result = result.select(fieldLists)
    }
    // if user doesn't pass value its going to be one
    const page = Number(req.query.page)|| 1
    const limit = Number(req.query.limit) || 7
    //if its page 3 then 3-1=2 * 7 which means it will skip 14 items
    const skip = (page-1)*limit;

    result = result.skip(skip).limit(limit)

    //remember in our case we have 23 products so this means we have 4 pages and each page lets say we have 7 items per page. the last page will have two items

    // Wait for the result to be resolved
    const products = await result

    // Send the products and the number of hits as a response
    res.status(200).json({products, nbHits:products.length})
}



module.exports = {
    getAllProducts,getAllProductsStatic,
}