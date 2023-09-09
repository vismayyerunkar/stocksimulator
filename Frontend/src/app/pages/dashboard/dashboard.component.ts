import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  stocksData: any[] = [];
  mostTradedStocks = [
    { title: 'Stock 1', value: '₹ 119.1', newCount: 20, isNew: true },
    { title: 'Stock 2', value: '₹ 1890.1', newCount: 10, isNew: true },
    { title: 'Stock 2', value: '₹ 2489.1', newCount: 10, isNew: true },
    { title: 'Stock 2', value: '₹ 2489.1', newCount: 10, isNew: true },

    // Add more stock data here
  ];

  mostTradedCryptos = [
    { title: 'Crypto 1', value: '₹119.10', newCount: 5.497, isNew: true },
    { title: 'Crypto 2', value: '₹2008.10', newCount: 2.673, isNew: true },
    { title: 'Crypto 2', value: '₹2008.10', newCount: 2.673, isNew: true },
    { title: 'Crypto 2', value: '₹2008.10', newCount: 2.673, isNew: true },

    // Add more crypto data here
  ];

  topLosersStocks = [
    {
      title: 'Stock 3',
      value: '₹ 678.09',
      percentageChange: '-10%',
      isNew: false,
    },
    {
      title: 'Stock 4',
      value: '₹ 593.76',
      percentageChange: '-5%',
      isNew: false,
    },
    {
      title: 'Stock 4',
      value: '₹ 593.76',
      percentageChange: '-5%',
      isNew: false,
    },
    {
      title: 'Stock 4',
      value: '₹ 593.76',
      percentageChange: '-5%',
      isNew: false,
    },
    // Add more top losers stocks data here
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
