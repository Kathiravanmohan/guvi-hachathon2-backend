const express=require('express')
const app= express()
const dotenv = require('dotenv')
dotenv.config()

const PORT= process.env.PORT

const indexRouter=require('./router/index')
const userRouter=require('./router/user')
const productRouter=require('./router/product')
app.use(express.json())

app.use('/',indexRouter)
app.use('/user',userRouter)
app.use('/product',productRouter)

app.listen(PORT,()=>console.log("App is listening port"+ PORT))