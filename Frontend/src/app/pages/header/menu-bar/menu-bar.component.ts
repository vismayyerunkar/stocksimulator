import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserAuthService } from 'src/services/user-auth.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  items: MenuItem[] = [];
  visibleSidebar: any;

  constructor(private userAuthService: UserAuthService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Assests',
        icon: 'pi pi-fw pi-server',
        items: [
          {
            label: 'Stocks',
            icon: 'pi pi-fw pi-shield',
          },
          {
            label: 'Crypto',
            icon: 'pi pi-fw pi-bitcoin',
          },
          {
            separator: true,
          },
          {
            label: 'New',
            icon: 'pi pi-fw pi-external-link',
          },
        ],
      },
      {
        label: 'Goal',
        icon: 'pi pi-fw pi-map',
      },
      {
        label: 'Portfolio',
        icon: 'pi pi-fw pi-server',
      },
      {
        label: 'Watchlist',
        icon: 'pi pi-fw pi-sliders-h',
      },
    ];
  }
}
