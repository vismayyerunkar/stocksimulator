import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/models/stock';
import { StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  transactions: any[];

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }
  
  fetchTransactions() {
    this.stockService.fetchTransactions().subscribe({
      next: (res: any) => {
        this.transactions = res;
        if(typeof this.transactions == typeof []){
          this.transactions.reverse();
        }
        console.log(res);
      },
    });
  }
}
