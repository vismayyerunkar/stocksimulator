import { Server } from "socket.io";
import { StockDataHandler } from "./socketController.js";
import { getGainersAndLoosers } from "../controllers/stockController.js";
import stocksocket from "stocksocket"

const createSocketServer =(server)=>{
    const io = new Server(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        },
    });
    return io;    
}
let io;
export const handleSocket = (server)=>{
     io = createSocketServer(server);
    console.log("Socket connection established")
    listenSocketEvents(io);
}

const tickers = [];
let curr = tickers.length
let prev = curr;

setInterval(()=>{
    if(tickers.length > 0 ){
        stocksocket.addTickers(tickers, (newPrice) => {
            console.log("alll tickers sss == ")
            console.log(newPrice.id);
            io.to(newPrice.id).emit("PRICE_CHANGED",newPrice);
        });
    }
    
},2000)



const listenSocketEvents = (io)=>{

    try {

        io.on("connection", (socket) => {
            const handler = new StockDataHandler(socket);
            // listening to events 
            socket.on("GET_STOCK_DATA",(payload,cb)=>{
                tickers.push(...payload.symbols);
                console.log(payload.symbols[0])
                socket.join(payload.symbols[0]);
                handler.GetStockDataStream(payload,cb)
            });
            socket.on('disconnect',()=>{
                console.log('client disconnected');
            });
        });


        // Getting the list of trending stocks
        let timeout = setInterval(async ()=>{
            io.sockets.emit("TRENDING_STOCKS",await getGainersAndLoosers(5));
        },5000);

        io.on("disconnect",()=>{
            clearInterval(timeout);
            console.log('client disconnected');
        });
    }catch(err){
        console.log("Error while socket client connection")
    }
}

