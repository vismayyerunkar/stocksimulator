import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Stock } from 'src/models/stock';
import { AssetService } from 'src/services/asset.service';
import { SocketService } from 'src/services/socketService';

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


  ngOnInit(): void {
    
    this.fetchStocks()
    this.items = [
      { label: 'ALL', icon: 'pi pi-fw pi-calendar' },
      { label: 'Stocks', icon: 'pi pi-fw pi-shield' },
      { label: 'Crypto', icon: 'pi pi-fw pi-bitcoin' },
    ];
  }
  constructor(private stockService: AssetService,private socketService: SocketService) {
    this.sortOptions = [
      { label: 'Symbol', value: 'symbol' },
      { label: 'Company Name', value: 'name' },
      { label: 'Price', value: 'price' },
      { label: 'Change (%)', value: 'changePercentage' },
    ];
    
    setTimeout(()=>{
      const set = new Set(this.symbols);
      socketService.getStockData([...set]).subscribe((data: any) => {
        console.log(data);
      });
    },2000);
  }
  fetchStocks(): void {
    
      this.stockService.GetAssest().subscribe({
        next: (res: any) => {
          this.assests = res;
          console.log(res);
          res?.forEach((d:any)=>{
            this.symbols?.push(d?.assetSymbol)
          })
        },
      });
    }
  }

