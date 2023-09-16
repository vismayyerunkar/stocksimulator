import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from 'src/services/asset.service';
declare const TradingView: any;

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss'],
})

export class StockDetailsComponent implements AfterViewInit {
  quantity: number = 1;
  subtotal: number = 79.899;
  title: string; // Add this property to store the title

  //For Buy
  assetSymbol:string;
  assetName: string;
  assetPrice: number=3;
  assetType: string ="STOCK";
  assetQuantity: number;

  //Added explisitly to check

  constructor(private route: ActivatedRoute , private buyreq: AssetService) {
    // Retrieve the title parameter from the route
    this.route.params.subscribe(params => {
      this.title = params['title'];
    });
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
    this.subtotal = this.quantity * 79.899; // Replace with the actual stock price
  }

  //this function will accept a name of stock
  buyAssest(){
    // Create a FormData object with your data
    const body = new FormData();
    body.append('assetSymbol', this.title);
    body.append('assetName', this.title);
    body.append('assetPrice', this.assetPrice.toString());
    body.append('assetType', this.assetType);
    body.append('assetQuantity', this.quantity.toString());

    // Call the API service to make the POST request
    this.buyreq.BuyAsset(body).subscribe(
      (response) => {
        // Handle the API response (success)
        console.log('Purchase successful:', response);
        // You can perform other actions like displaying a success message.
      },
      (error) => {
        // Handle errors from the API
        console.error('Purchase failed:', error);
        // You can display an error message to the user or take other actions.
      }
    );
  }


}
