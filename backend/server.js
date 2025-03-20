// import path from path
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv  from 'dotenv'
import path from "path"
import  connectDB  from './config/db.js'
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoutes from './routes/productRoute.js'
import uploadRoutes from './routes/uploadRoute.js'
import orderRoutes from './routes/orderRoute.js'
dotenv.config()
const PORT = process.env.PORT || 5000
connectDB()

const app =express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use("/api/users", userRoute)
app.use("/api/category", categoryRoute)
app.use("/api/products",productRoutes)
app.use("/api/upload",uploadRoutes)
app.use("/api/orders",orderRoutes)


app.get('/', (req,res)=>{
    res.status(200).json({message: "welcome to your ultimate Ecommerce server"})
})

app.get("/api/config/paypal", (req,res)=>{
    res.send({clientId:process.env.PAYPAL_CLIENT_ID})
})

const _dirname= path.resolve()
app.use("/uploads",express.static(path.join(_dirname + "/uploads")))
app.listen(PORT, ()=>console.log(`you're connected to port ${PORT}`))