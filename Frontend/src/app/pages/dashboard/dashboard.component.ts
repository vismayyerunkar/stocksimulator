import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../services/socketService';  
import { Routes } from '@angular/router';
import { StockDetailsComponent } from '../stock-details/stock-details.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {

  public topLoosers:any[] = [];
  public topGainers:any[] = [];
  routes: Routes = [
    // ... other routes ...

    // Define the stock-details route
    { path: 'stock-details/:1', component: StockDetailsComponent },
  ];

  constructor(private socketService: SocketService){

      this.topLoosers = [...new Array(5)].map(() => 0);
      this.topGainers = [...new Array(5)].map(() => 0);

      console.log("called...")
      socketService.fetchTopStocks()?.subscribe((data: any) => {
        // this.topLosersStocks= data;
        this.topGainers = data?.gainers;
        this.topLoosers = data?.losers;
        console.log(data?.gainers);
        console.log(data?.losers);
        this.cleanUp();
      })
  }


  cleanUp(){
    this.topGainers = this.topGainers.filter((stock)=>stock?.meta && stock?.symbol != "NIFTY 50");
    this.topLoosers = this.topLoosers.filter((stock)=>stock?.meta && stock?.symbol != "NIFTY 50");
    this.topGainers.length = 5;
    this.topLoosers.length = 5;
  }

  stocksData: any[] = [];
  

  mostTradedCryptos = [
    { title: 'Crypto 1', value: '₹119.10', newCount: 5.497, isNew: true },
    { title: 'Crypto 2', value: '₹2008.10', newCount: 2.673, isNew: true },
    { title: 'Crypto 2', value: '₹2008.10', newCount: 2.673, isNew: true },
    { title: 'Crypto 2', value: '₹2008.10', newCount: 2.673, isNew: true },

    // Add more crypto data here
  ];


  topLosersCryptos = [
    {
      title: 'Crypto 3',
      value: '₹119.10',
      percentageChange: '-8%',
      isNew: false,
    },
    {
      title: 'Crypto 4',
      value: '₹119.10',
      percentageChange: '-12%',
      isNew: false,
    },
    {
      title: 'Crypto 4',
      value: '₹119.10',
      percentageChange: '-12%',
      isNew: false,
    },
    {
      title: 'Crypto 4',
      value: '₹119.10',
      percentageChange: '-12%',
      isNew: false,
    },
    // Add more top losers cryptos data here
  ];
  newIPOs = [
    { name: 'IPO 1', image: 'url_to_image_1' },
    { name: 'IPO 2', image: 'url_to_image_2' },
    // ... add more IPO data ...
  ];
  ngOnInit(): void {}
}