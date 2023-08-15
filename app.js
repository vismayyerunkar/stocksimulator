import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import connectDB from './config/connectdb.js'
import userRoutes from './routes/user.js'
import watchlistRoutes from './routes/watchlist.js'
import stockRoutes from './routes/stock.js'
import http from 'http';
import {handleSocket} from './socket/socketHandler.js'
import checkUserAuth from './middlewares/auth-middleware.js';
import * as URL from './helpers/constants.js';
import axios from 'axios';
import {getCurrentStockPrice,getGainersAndLoosers,getStockPriceBetweenDateRange} from "./controllers/stockController.js"



// constants
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.get('/',async (req,res)=>{
    return res.send("RitchIn server ready");
});

//Routes
app.use("/api/user", userRoutes);
app.use("/api/watchlist",checkUserAuth,watchlistRoutes)
app.use("/api/stock",checkUserAuth,stockRoutes);

const server = http.createServer(app); // Add this
server.listen(PORT, () => {
  console.log(`Server listening at ${process.env.BACKEND_URL}:${PORT}`)
  handleSocket(server);
  connectDB(DATABASE_URL);
});
