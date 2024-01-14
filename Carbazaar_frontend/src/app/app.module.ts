import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './reusablecomponents/navbar/navbar.component';
import { FooterComponent } from './reusablecomponents/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { SearchComponent } from './reusablecomponents/search/search.component';
import { FeaturesComponent } from './components/features/features.component';
import { NotificationComponent } from './reusablecomponents/notification/notification.component';
import { CarbrandsComponent } from './components/carbrands/carbrands.component';
import { PromoComponent } from './components/promo/promo.component';
import { CardgriditemComponent } from './reusablecomponents/cardgriditem/cardgriditem.component';
import { CarSuggestionsComponent } from './components/car-suggestions/car-suggestions.component';
import { QueriesComponent } from './components/car-suggestions/queries/queries.component';
import { SearchBarComponent } from './components/car-suggestions/search-bar/search-bar.component';
import { DealerComponent } from './components/dealer/dealer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AllDealersComponent } from './components/all-dealers/all-dealers.component';

import { CarFeaturesComponent } from './components/car-features/car-features.component';
import { CarCompareComponent } from './components/car-compare/car-compare.component';
import { CarfeaturelistComponent } from './reusablecomponents/carfeaturelist/carfeaturelist.component';
import { CardfeaturegridComponent } from './reusablecomponents/cardfeaturegrid/cardfeaturegrid.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { SinglecarvariantdetailsComponent } from './reusablecomponents/singlecarvariantdetails/singlecarvariantdetails.component';
import { NewcarbodyComponent } from './components/newcarbody/newcarbody.component';
import { OldcarbodyComponent } from './components/oldcarbody/oldcarbody.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OldcarsComponent } from './components/oldcars/oldcars.component';
import { NewcarsComponent } from './components/newcars/newcars.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DealerCompareComponent } from './components/dealer-compare/dealer-compare.component';
import { TestComponent } from './test/test.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'compare/:type', component: CarCompareComponent },
  { path: 'details/:type/:id', component: CarDetailsComponent },
  { path: 'oldcars', component: OldcarsComponent },
  { path: 'newcars', component: NewcarsComponent },
  { path: 'details', component: CarDetailsComponent },
  { path: 'dealerCompare', component: DealerCompareComponent },
  { path: 'dealer/:id', component: DealerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    BannerComponent,
    SearchComponent,
    FeaturesComponent,
    NotificationComponent,
    CarbrandsComponent,
    PromoComponent,
    CardgriditemComponent,
    CarSuggestionsComponent,
    QueriesComponent,
    SearchBarComponent,
    DealerComponent,
    AllDealersComponent,
    CarFeaturesComponent,
    CarCompareComponent,
    CarfeaturelistComponent,
    CardfeaturegridComponent,
    CarDetailsComponent,
    SinglecarvariantdetailsComponent,
    NewcarbodyComponent,
    OldcarbodyComponent,
    DealerCompareComponent,
    OldcarsComponent,
    NewcarsComponent,
    TestComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
