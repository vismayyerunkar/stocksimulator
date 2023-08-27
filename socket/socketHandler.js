import { Server } from "socket.io";
import { StockDataHandler } from "./socketController.js";
import { getGainersAndLoosers } from "../controllers/stockController.js";

const createSocketServer =(server)=>{
    const io = new Server(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        },
    });
    return io;    
}

export const handleSocket = (server)=>{
    const io = createSocketServer(server);
    console.log("Socket connection established")
    listenSocketEvents(io);
}

const listenSocketEvents = (io)=>{

    try {

        io.on("connection", (socket) => {
            const handler = new StockDataHandler(socket);
            // listening to events 
            socket.on("GET_STOCK_DATA",(payload,cb)=>handler.GetStockDataStream(payload,cb));
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

