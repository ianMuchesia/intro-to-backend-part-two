require('dotenv').config()
require('express-async-errors')
//async error


const express = require('express');
const app = express()

const connectDB = require("./db/connect")

const productsRouter = require("./routes/product")

const notFoundMiddleware = require("./middleware/notFound")
const errorMiddleWare = require("./middleware/error-handler")

const port = process.env.PORT || 3000

//middleware
app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><br><a href="/api/v1/products">Products Route</a>')
})

app.use("/api/v1/products",productsRouter)

//products routes
app.use(notFoundMiddleware)
app.use(errorMiddleWare)


//start
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`server listening at port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
