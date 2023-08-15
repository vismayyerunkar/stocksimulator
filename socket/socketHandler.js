import { Server } from "socket.io";
import { StockDataHandler } from "./socketController.js";


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
    io.on("connection", (socket) => {
        const handler = new StockDataHandler(socket);
        
        // listening to events 
        socket.on("GET_STOCK_DATA",(payload,cb)=>handler.GetStockDataStream(payload,cb));
        socket.on('disconnect',()=> console.log('client disconnected'));
    });

    io.on("disconnect",()=>{
        console.log('client disconnected');
    });
}

