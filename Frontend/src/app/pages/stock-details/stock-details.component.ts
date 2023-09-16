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

  //For Buy
  assetSymbol:string;
  assetName: string;
  assetPrice: number;
  assetType: string ="STOCK";
  assetQuantity: number;

  currentStock:any

  //Added explisitly to check

  constructor(private route: ActivatedRoute , private buyreq: AssetService,private socketService :SocketService) {
    // Retrieve the title parameter from the route
    this.route.params.subscribe(params => {
      this.title = params['title'];
    });

    socketService.getStockData([this.title]);
    socketService.getStaticStockData()?.subscribe((data:any)=>{
      console.log("static stock data : ",data)
      this.currentStock = data[0];
      this.subtotal = data[0].price;
      this.assetPrice = data[0]?.price;
    })
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
        width: 900,
        height: 610,
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

}
