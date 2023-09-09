
import stocksocket from "stocksocket";
import { isMarketOpen } from "../controllers/stockController.js";
import { NseIndia } from "stock-nse-india";
const nseIndia = new NseIndia()



export class StockDataHandler {
    // Maintaining the client to emit the socket events
    socket = null;
    constructor(socketClient) {
        console.log("Client connected");
        this.socket = socketClient;
    }

    //Getting live data for list of specified stocks
    GetStockDataStream = async (payload, cb) => {
        try {
            var stocktickers = payload.symbols;
            const is_market_open = await isMarketOpen();
            if (is_market_open) {
                // stocktickers.forEach((symbolData)=>{
                //     this.socket.join(symbolData);
                // });
                console.log("market is open");
            } else {
                getStockData(stocktickers).then((data) => {
                    const transformedData = [];
                    if (data.length > 0) {
                        data.forEach(stock => {
                            const rawData = stock;
                            transformedData.push({
                                id: rawData.info.symbol,
                                price: rawData.priceInfo.lastPrice,
                                dayVolume: rawData.preOpenMarket.totalTradedVolume
                            });
                        });
                    }
                    cb(transformedData);
                }).catch((err) => {
                    console.log("Something went wrong while fetching stock data when the market is closed")
                })
            }
        } catch (er) {
            console.log("error occured while getting stock stream")
        }
    }
}


async function getStockData(symbols) {

    if(symbols.length == 0) return [];
    const responses = [];

    for (const symbol of symbols) {
        try {
            if (!symbol) {
                throw new Error("No Symbol specified");
            }

            const response = await nseIndia.getEquityDetails(symbol);
            responses.push(response);
        } catch (error) {
            console.error(`Error fetching data for ${symbol}`);
        }
    }

    return responses;
}
