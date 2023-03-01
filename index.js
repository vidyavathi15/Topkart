import express from "express";
import bodyParser from "body-Parser";
import connectDB from "./config/connection.js"
import dotenv from "dotenv";
import errorHandler from "./middleware/errorMiddleware.js";
import dealRoute from "./routes/dealRoute.js"


dotenv.config();
const port = process.env.PORT || 5000

//database connection
connectDB()


const app = express();



// middlewares

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));


//routes usage
app.use('/deal',dealRoute);


//error middlware
app.use(errorHandler);

app.listen(port, () => console.log(`Server connected to port ${port}`));









