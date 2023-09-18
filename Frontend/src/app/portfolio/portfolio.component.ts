import { SocketService } from 'src/services/socketService';
import { AssetService } from 'src/services/asset.service';
import { environment } from 'src/environments/environment';
import  axios from 'axios';
import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Stock } from 'src/models/stock';
import { StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  filteredStocks: Stock[] = [];
  sortOptions: SelectItem[];
  stocks: Stock[] = [];
  items: MenuItem[] = [];

  assests: any[];
  symbols:string[] = [];
  updatedStocks:any;
  investedAmount:number = 0;
  currentAmount:number = 0;

  investedAmountStocks:number = 0;
  currentAmountStocks:number = 0;

  investedAmountCrypto:number = 0;
  currentAmountCrypto:number = 0;

  //API SELL
  sellAsset(assetId:any){
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`;
      return config;
    });

    console.log(assetId)
      axios.post(`${environment.baseUrl}/api/assets/sellAsset`,{assetId:assetId}).then((res:any)=>{
        console.log(res.data);
        alert("Asset sold successfully");
        window.location.reload();
      }).catch((err:any)=>
      console.log(err))
  }


  ngOnInit(): void {
    this.fetchStocks();
    this.items = [
      { label: 'ALL', icon: 'pi pi-fw pi-calendar' },
      { label: 'Stocks', icon: 'pi pi-fw pi-shield' },
      { label: 'Crypto', icon: 'pi pi-fw pi-bitcoin' },
    ];
  }

  constructor(private stockService: AssetService,private socketService: SocketService) {
    this.fetchStocks()
    
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
    },1000);
   
    // socketService.subscribeToContinousData().subscribe((data:any)=>{
    //   //setting the live price
    //   for(let i= 0;i<this.watchlist.length;i++){
    //     if(this.watchlist[i]?.stockSymbol == data.id?.split(".")[0]){
    //       this.watchlist[i] = {
    //         ...this.watchlist[i],
    //         currentPrice:data?.price
    //       }
    //     }
    //   }
    //   // data.map((item:any)=>{
    //   //     console.log(item)
    //   // });

    // })

    socketService.getStaticStockData()?.subscribe((data:any)=>{
      console.log("static stock data : ",data);
      console.log(data);
      this.updatedStocks = data

      const map = new Map();

      data?.forEach((ele:any) => {
          map.set(ele?.id,ele?.price);
      });

      const copy:any[] = [];

      this.assests.map((asset:any)=>{
        const entry = {
          ...asset,
          currentPrice:map.get(asset?.assetSymbol)
        }

        this.currentAmount += entry?.currentPrice * entry?.assetQuantity;
        this.investedAmount += entry?.assetQuantity * entry?.assetPrice;

        if(asset.assetType ==='STOCK'){
        this.currentAmountStocks += entry?.currentPrice * entry?.assetQuantity;
        this.investedAmountStocks += entry?.assetQuantity * entry?.assetPrice
        }
        else{
        this.currentAmountCrypto += entry?.currentPrice * entry?.assetQuantity;
        this.investedAmountCrypto += entry?.assetQuantity * entry?.assetPrice
        }
        console.log(entry);
        copy.push(entry);
      });

      console.log(copy);
      this.assests = copy;
    })
    
    // setTimeout(()=>{
    //   const set = new Set(this.symbols);
    //   socketService.getStockData([...set]).subscribe((data: any) => {
    //     console.log(data);
    //   });
    // },2000);
  }

  fetchStocks(): void {
        
      this.stockService.GetAssest().subscribe({
        next: (res: any) => {
          this.assests = res;
          if(typeof res == typeof []){
            this.assests.reverse();
          }
          console.log(res);
          const temp:any[] = []
          res?.forEach((d:any)=>{
            temp?.push(d?.assetSymbol?.toUpperCase())
          })

          this.symbols = temp;
        },
      });
    }
  }

