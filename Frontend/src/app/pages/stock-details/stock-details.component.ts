import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  //Added explisitly to check

  constructor(private route: ActivatedRoute) {
    // Retrieve the title parameter from the route
    this.route.params.subscribe((params) => {
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
    this.subtotal = this.quantity * 79.899; // Replace with the actual stock price
  }

  buyAssest() {}
}
