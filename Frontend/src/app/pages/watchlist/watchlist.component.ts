import { Component, OnInit } from '@angular/core';

import { SelectItem } from 'primeng/api';
import { Stock } from 'src/models/stock';
import { IWatchListResponse, Watchlist } from 'src/models/watchlist';
import { StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent implements OnInit {
  stocks: Stock[] = [];
  filteredStocks: Stock[] = [];
  sortOptions: SelectItem[];
  watchlist: any[];

  constructor(private stockService: StockService) {
    this.sortOptions = [
      { label: 'Symbol', value: 'symbol' },
      { label: 'Company Name', value: 'name' },
      { label: 'Price', value: 'price' },
      { label: 'Change (%)', value: 'changePercentage' },
    ];
    this.getWatchlistList();
  }

  ngOnInit(): void {
    this.fetchStocks();
  }
  createNewWatchlist(): void {}

  fetchStocks(): void {
    this.stockService.getStocks().subscribe((data) => {
      this.stocks = data;
      this.filteredStocks = data;
    });
  }

  filterStocks(event: Event): void {
    const filterText =
      (event.target as HTMLInputElement)?.value?.toLowerCase() || '';
    this.filteredStocks = this.stocks.filter((stock) =>
      stock.symbol.toLowerCase().includes(filterText)
    );
  }
  //usable
  getWatchlistList() {
    this.stockService.fetchWatchList().subscribe({
      next: (res: any) => {
        this.watchlist = res;
        console.log(res);
      },
    });
  }
}
