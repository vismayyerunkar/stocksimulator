import { Component, OnInit } from '@angular/core';

import { SelectItem } from 'primeng/api';
import { Stock } from 'src/models/stock';
import { IWatchListResponse, Watchlist } from 'src/models/watchlist';
import { SocketService } from 'src/services/socketService';
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
  assests: any[];
  updatedStocks:any;
  symbols:string[] = [];


  constructor(private stockService: StockService,private socketService: SocketService) {
    this.getWatchlistList();
    
    this.sortOptions = [
      { label: 'Symbol', value: 'symbol' },
      { label: 'Company Name', value: 'name' },
      { label: 'Price', value: 'price' },
      { label: 'Change (%)', value: 'changePercentage' },
    ];

    setTimeout(()=>{
      const set = new Set(this.symbols);
      socketService.getStockData([...set]);
      console.log("symbol",this.symbols);
    },300);

    socketService.getStaticStockData()?.subscribe((data:any)=>{
      console.log("static stock data : ",data);

      const map = new Map();

      data?.forEach((ele:any) => {
          map.set(ele?.id,ele?.price);
      });

      const copy:any[] = [];

      this.watchlist.map((Wassest:any)=>{
        const entry = {
          ...Wassest,
          currentPrice:map.get(Wassest?.stockSymbol)
        }
        copy.push(entry);
      });
  
      this.watchlist = copy;
      console.log(this.watchlist);
    })

  }

  ngOnInit(): void {
    
  }
  createNewWatchlist(): void {}

  getWatchlistList() {
    this.stockService.fetchWatchList().subscribe({
      next: (res: any) => {
        this.watchlist = res;
        console.log(res);

        if(typeof this.watchlist == typeof []){
          this.watchlist.reverse();
        }

        const temp:any[] = []
          res?.forEach((d:any)=>{
            temp?.push(d?.stockSymbol)
          })
          this.symbols = temp;
      },
    });
  }
}
