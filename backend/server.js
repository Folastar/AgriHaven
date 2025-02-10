// import path from path
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv  from 'dotenv'

import  connectDB  from './config/db.js'
import userRoute from './routes/userRoute.js'

dotenv.config()
const PORT = process.env.PORT || 5000
connectDB()

const app =express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use("/api/users", userRoute)
app.listen(PORT, ()=>console.log(`you're connected to port ${PORT}`))