import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { StockDetailsComponent } from '../stock-details/stock-details.component';
import { Stock } from 'src/models/stock';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  stocksData: Stock[] = [];
  routes: Routes = [
    // ... other routes ...

    // Define the stock-details route
    { path: 'stock-details/:1', component: StockDetailsComponent },
  ];
  mostTradedStocks = [
    { id: 1, title: 'Stock 1', value: '₹ 119.1', newCount: 20, isNew: true },
    { id: 2, title: 'Stock 2', value: '₹ 1890.1', newCount: 10, isNew: true },
    { id: 3, title: 'Stock 2', value: '₹ 2489.1', newCount: 10, isNew: true },
    { id: 4, title: 'Stock 2', value: '₹ 2489.1', newCount: 10, isNew: true },
  ];

  mostTradedCryptos = [
    {
      id: 1,
      title: 'Crypto 1',
      value: '₹119.10',
      newCount: 5.497,
      isNew: true,
    },
    {
      id: 2,
      title: 'Crypto 2',
      value: '₹2008.10',
      newCount: 2.673,
      isNew: true,
    },
    {
      id: 3,
      title: 'Crypto 2',
      value: '₹2008.10',
      newCount: 2.673,
      isNew: true,
    },
    {
      id: 4,
      title: 'Crypto 2',
      value: '₹2008.10',
      newCount: 2.673,
      isNew: true,
    },

    // Add more crypto data here
  ];

  topLosersStocks = [
    {
      id: 1,
      title: 'Stock 3',
      value: '₹ 678.09',
      percentageChange: '-10%',
      isNew: false,
    },
    {
      id: 2,
      title: 'Stock 4',
      value: '₹ 593.76',
      percentageChange: '-5%',
      isNew: false,
    },
    {
      id: 3,
      title: 'Stock 4',
      value: '₹ 593.76',
      percentageChange: '-5%',
      isNew: false,
    },
    {
      id: 4,
      title: 'Stock 4',
      value: '₹ 593.76',
      percentageChange: '-5%',
      isNew: false,
    },
    // Add more top losers stocks data here
  ];

  topLosersCryptos = [
    {
      id: 1,
      title: 'Crypto 3',
      value: '₹119.10',
      percentageChange: '-8%',
      isNew: false,
    },
    {
      id: 2,
      title: 'Crypto 4',
      value: '₹119.10',
      percentageChange: '-12%',
      isNew: false,
    },
    {
      id: 3,
      title: 'Crypto 4',
      value: '₹119.10',
      percentageChange: '-12%',
      isNew: false,
    },
    {
      id: 4,
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
  stock: any;
  ngOnInit(): void {}
}
