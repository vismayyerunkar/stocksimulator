
import stocksocket from "stocksocket";

export class StockDataHandler{
    // Maintaining the client to emit the socket events
    socket = null;
    constructor(socketClient){
        console.log("Client connected");
        this.socket = socketClient;
    }
    
    GetStockDataStream = (payload,cb)=>{
        var stocktickers = [payload.symbol];
        console.log("sending data for :",payload.symbol);

        stocksocket.addTickers(stocktickers, (newPrice)=>{
            console.log(newPrice);
            cb(newPrice);
        });

        cb("TEMP DATA")
    }
}


// y ticker lyf
