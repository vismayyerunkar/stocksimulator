import { Component, OnInit } from '@angular/core';
import axios from 'axios';

import { SelectItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
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

  removeWatchlist:any;


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

    socketService.subscribeToContinousData().subscribe((data:any)=>{
      //setting the live price
      for(let i= 0;i<this.watchlist.length;i++){
        if(this.watchlist[i]?.stockSymbol == data.id?.split(".")[0]){
          this.watchlist[i] = {
            ...this.watchlist[i],
            currentPrice:data?.price
          }
        }
      }
      // data.map((item:any)=>{
      //     console.log(item)
      // });

    })

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

  // deleteStock(watchlistId: string): void {
  //   // Send a request to your backend API to remove the watchlist by its ID
  //   this.stockService.removeWatchList(watchlistId).subscribe({
  //     next: (response: any) => {
  //       console.log('Watchlist removed successfully:', response.message);
  
  //       // Remove the deleted watchlist from the frontend array
  //       this.watchlist = this.watchlist.filter((watchlist) => watchlist.id !== watchlistId);
  //     },
  //     error: (error: any) => {
  //       console.error('Error removing watchlist:', error);
  //     },
  //   });
  // }

  deleteWatchlist(watchlistId : string) {
    console.log(watchlistId);
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        'authToken'
      )}`;
      return config;
    });
    axios
      .post(`${environment.baseUrl}/api/watchlist/removeWatchList`, {
        removeWatchlist : watchlistId
      })
      .then(function (response) {
        console.log(response);
        alert('Watchlist removed successfully');
      })
      .catch(function (error) {
        console.log(error);
        alert('Something went wrong , please try again');
      });

    return;
    // Create a FormData object with your data
  }

}
