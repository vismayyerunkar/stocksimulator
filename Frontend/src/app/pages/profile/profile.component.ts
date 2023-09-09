import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/models/stock';
import { StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  transactions: Stock[] = [];

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }
  fetchTransactions(): void {
    this.stockService.getStocks().subscribe((data) => {
      this.transactions = data;
    });
  }
}
