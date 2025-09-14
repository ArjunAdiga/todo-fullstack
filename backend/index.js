require('dotenv').config();
const express = require('express');
const app = express()
const cors = require('cors');
const connection = require('./db')
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const todoRouter = require("./routes/todo");

// databse connection
connection()

// middlewares
app.use(express.json())
app.use(cors())

// route
app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/todos", todoRouter);

const PORT = process.env.PORT || 5000
app.listen(PORT,() => {console.log("listening to the port",PORT)})
