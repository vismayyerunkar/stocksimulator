import { Category } from 'src/models/feedback';
import { environment } from 'src/environments/environment';
import axios from 'axios';
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
  userData:any;
  funds:string | number 
  // randomProfilePic:string

  constructor(private userAuthService: UserAuthService) {
    // const temp:any = localStorage.getItem("loggedUserRandomProfile")

    // if(typeof temp == typeof undefined){
    //   localStorage.setItem("loggedUserRandomProfile",`https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*10)}.jpg`)
    // }else{
    //   this.randomProfilePic = JSON.parse(temp == "undefined" ? "https://randomuser.me/api/portraits/men/12.jpg" : temp);
    // }

    this.userData = JSON.parse(localStorage.getItem("user") ?? "{}");
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`;
      return config;
  });
    axios.get(`${environment.baseUrl}/api/user/loggedUser`).then((res:any)=>{
      console.log(res.data)
      this.funds = res.data?.user?.availableTokens
    }).catch((err:any)=>{
      console.log("Error occured : ",err);
    })
  }

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
}
