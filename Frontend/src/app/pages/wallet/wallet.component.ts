import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from 'src/models/Product';
import { ProductService } from 'src/services/productservice';
import { SocketService } from 'src/services/socketService';
import { StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  items: MenuItem[] = [];
  stocksData: any[] = [];
  products: Product[] = [];

  // get the list of stocks from the api and then get the live data for this stock if the market is open the subscribe to continous data

  constructor(private stockService: StockService,private socketService: SocketService) {

  }

  ngOnInit() {
    this.items = [
      { label: 'ALL', icon: 'pi pi-fw pi-calendar' },
      { label: 'Stocks', icon: 'pi pi-fw pi-shield' },
      { label: 'Crypto', icon: 'pi pi-fw pi-bitcoin' },
    ];
    this.stockService.getStocks().subscribe(
      (stocks) => {
        this.stocksData = stocks;
      },
      (error) => {
        console.error('Error fetching stocks:', error);
      }
    );
  }
}
