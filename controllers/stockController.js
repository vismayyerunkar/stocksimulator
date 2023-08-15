import { NseIndia } from  "stock-nse-india";
const  nseIndia = new  NseIndia()
import StockSocket from "stocksocket";

export const getCurrentStockPrice = async (req,res) =>{
    try {
        const {symbol} = req.body;
        const resp = await nseIndia.getEquityDetails(symbol);
        console.log(resp);
        return res.send({data:resp.priceInfo});
        // return resp.priceInfo;
    }catch(err){
        throw Error(err);
    }
}

export const getStockPriceBetweenDateRange = async (req,res)=>{

    const {symbol,start,end} = req.body;

    try {
        const range = {
            start:new Date(start),
            end:new Date(end)
        }

        const data = await nseIndia.getEquityHistoricalData(symbol, range);
        console.log(data[0].data);
        return res.send({data:data});

    }catch(err){
        throw Error(err);
    }
}

export const getGainersAndLoosers = async (req,res)=>{
    const {limit} = req.body
    const indexData = await nseIndia.getEquityStockIndices("NIFTY 50");
    
    const gainers = [];
    const losers = [];

    indexData.data.forEach((equityInfo) => {
        if (gainers.length < limit && equityInfo.pChange > 0)
            gainers.push(equityInfo)
        else if(losers.length < limit && equityInfo.pChange <= 0){
            losers.push(equityInfo)
        }else{
            return true;
        }
    });

    const data =  {
        gainers: [...gainers].sort((a, b) => b.pChange - a.pChange),
        losers: [...losers].sort((a, b) => a.pChange - b.pChange)
    }   
    console.log(data.gainers);
    return res.send({data:data}); 
}


// StockSocket.addTicker("AAPL", stockPriceChanged);

// function stockPriceChanged(data) {
//   //Choose what to do with your data as it comes in.
//   console.log(data);
// }

