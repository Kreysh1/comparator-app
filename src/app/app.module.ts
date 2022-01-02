import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { FavSheetComponent } from './components/fav-sheet/fav-sheet.component';
import { ProductsComponent } from './components/products/products.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { RegionDialogComponent } from './components/region-dialog/region-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    FavSheetComponent,
    ProductsComponent,
    TrackingComponent,
    RegionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
