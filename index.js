import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/connection.js"
import dotenv from "dotenv";
import errorHandler from "./middleware/errorMiddleware.js";
import adminRoute from "./routes/adminRoute.js"
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"

dotenv.config();
const port = process.env.PORT || 5000

//database connection
connectDB()


const app = express();



// middlewares

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));


//routes usage
app.use('/auth',authRoute)
app.use('/admin',adminRoute);
app.use('/',userRoute);


//error middlware
app.use(errorHandler);

app.listen(port, () => console.log(`Server connected to port ${port}`));









