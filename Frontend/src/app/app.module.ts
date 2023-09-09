import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { StockDetailsComponent } from './pages/stock-details/stock-details.component';
import { HeaderModule } from './pages/header/header.module';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { WalletComponent } from './pages/wallet/wallet.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FooterComponent } from './pages/footer/footer.component';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenubarModule } from 'primeng/menubar';
import { WalletPieChartComponent } from './pages/wallet-pie-chart/wallet-pie-chart.component';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { ProductService } from 'src/services/productservice';
import { TestComponent } from './test/test.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { WatchlistModule } from './pages/watchlist/watchlist.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';
import { SignupComponent } from './pages/signup/signup.component';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [
    AppComponent,
    StockDetailsComponent,
    WalletComponent,
    FooterComponent,
    WalletPieChartComponent,
    TestComponent,
    PortfolioComponent,
    ProfileComponent,
    SignupComponent,
  ],
  bootstrap: [AppComponent],
  providers: [DatePipe, ProductService],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HeaderModule,
    PanelMenuModule,
    ButtonModule,
    CardModule,
    TableModule,
    TabViewModule,
    TabMenuModule,
    MenubarModule,
    ChartModule,
    ImageModule,
    TagModule,
    DataViewModule,
    WatchlistModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
  ],
})
export class AppModule {}
