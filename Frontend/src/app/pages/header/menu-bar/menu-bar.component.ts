import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Assests',
        icon: 'pi pi-fw pi-server',
        items: [
          {
            label: 'Stocks',
            icon: 'pi pi-fw pi-shield',
            routerLink: ['/wallet'],
          },
          {
            label: 'Crypto',
            icon: 'pi pi-fw pi-bitcoin',
            routerLink: ['/wallet'],
          },
          {
            separator: true,
          },
          {
            label: 'New',
            icon: 'pi pi-fw pi-external-link',
            routerLink: ['/dashboard'],
          },
        ],
      },
      {
        label: 'Goal',
        icon: 'pi pi-fw pi-map',
        routerLink: ['/goal'],
      },
      {
        label: 'Portfolio',
        icon: 'pi pi-fw pi-server',
        routerLink: ['/portfolio'],
      },
      {
        label: 'Watchlist',
        icon: 'pi pi-fw pi-sliders-h',
        routerLink: ['/watchlist'],
      },
      {
        label: 'AI-GPT',
        icon: 'pi pi-search-plus',
        routerLink: ['/gpt'],
      },
    ];
  }
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
