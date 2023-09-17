import { SocketService } from 'src/services/socketService';
import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from 'src/services/asset.service';
import axios from "axios";
import { environment } from 'src/environments/environment';

declare const TradingView: any;

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss'],
})
export class StockDetailsComponent implements AfterViewInit {
  quantity: number = 1;
  subtotal: number = 1;
  title: string; // Add this property to store the title
  ASSET_TYPE:string;
  
  //For Buy
  assetSymbol:string;
  assetName: string;
  assetPrice: number;
  assetType: string ="STOCK";
  assetQuantity: number;

  currentStock:any

//WatchList
    stockSymbol:string;
    stockName: string;
    type: string ="STOCK";
  //Added explisitly to check
  

  constructor(private route: ActivatedRoute , private buyreq: AssetService,private socketService :SocketService) {
    // Retrieve the title parameter from the route
    this.route.params.subscribe((params) => {
      this.title = params['title'];
      this.ASSET_TYPE = params['type'];
    });

    if(this.ASSET_TYPE === "STOCK"){

      const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin')

      pricesWs.onmessage = function (msg) {
          console.log(msg.data)
      }

      socketService.getStockData([this.title]);
      socketService.getStaticStockData()?.subscribe((data:any)=>{
        console.log("static stock data : ",data)
        this.currentStock = data[0];
        this.subtotal = data[0].price;
        this.assetPrice = data[0]?.price;
      })

    }else{
      //dfghjk

      const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin')

      pricesWs.onmessage = function (msg) {
          console.log(msg.data)
      }
    }

   
  }


  ngAfterViewInit(): void {
    this.loadTradingViewLibrary();
  }

  loadTradingViewLibrary() {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      this.initializeTradingViewWidget();
    };
    document.head.appendChild(script);
  }

  initializeTradingViewWidget() {
    if (typeof TradingView !== 'undefined') {
      new TradingView.widget({
        with: '100%',
        symbol: this.title,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: 'trading-chart',
      });
    } else {
      console.error('TradingView library is not loaded.');
    }
  }
  calculateSubtotal() {
    // Calculate the subtotal based on the quantity
    this.subtotal = this.quantity * this.currentStock?.price; // Replace with the actual stock price
  }


  //this function will accept a name of stock
  buyAssest(){
    axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`;
        return config;
    });
    axios.post(`${environment.baseUrl}/api/assets/purchaseAsset`, {
      assetSymbol:this.title,
      assetName:this.title,
      assetPrice: this.assetPrice,
      assetType: this.assetType,
      assetQuantity: this.quantity
    })
    .then(function (response) {
      console.log(response);
      alert("Buy successfull");

    })
    .catch(function (error) {
      console.log(error);
      alert("Something went wrong , please try again");
    })

    return 
    // Create a FormData object with your data
  }

  addToWatchlist(){
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`;
      return config;
  });
  axios.post(`${environment.baseUrl}/api/watchlist/createWatchList`, {
    stockSymbol:this.title,
    stockName:this.title,
    type: this.assetType,
  })
  .then(function (response) {
    console.log(response);
    alert("Added To the Watchlist");

  })
  .catch(function (error) {
    console.log(error);
    alert("Something went wrong , please try again");
  })

  return 
  }

}
