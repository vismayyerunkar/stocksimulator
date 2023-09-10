import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { Stock } from 'src/models/stock';
import { AssetService } from 'src/services/asset.service';

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

  ngOnInit(): void {
    this.fetchStocks();
    this.items = [
      { label: 'ALL', icon: 'pi pi-fw pi-calendar' },
      { label: 'Stocks', icon: 'pi pi-fw pi-shield' },
      { label: 'Crypto', icon: 'pi pi-fw pi-bitcoin' },
    ];
  }
  constructor(private stockService: AssetService) {
    this.sortOptions = [
      { label: 'Symbol', value: 'symbol' },
      { label: 'Company Name', value: 'name' },
      { label: 'Price', value: 'price' },
      { label: 'Change (%)', value: 'changePercentage' },
    ];
  }
  fetchStocks(): void {
      this.stockService.GetAssest().subscribe({
        next: (res: any) => {
          this.assests = res;
          console.log(res);
        },
      });
    }
  }

