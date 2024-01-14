import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDealersComponent } from './components/all-dealers/all-dealers.component';
import { CarSuggestionsComponent } from './components/car-suggestions/car-suggestions.component';
import { DealerCompareComponent } from './components/dealer-compare/dealer-compare.component';
import { DealerComponent } from './components/dealer/dealer.component';

const routes: Routes = [
  {
    path: 'carSuggestions',
    component: CarSuggestionsComponent
  },
  {
    path: 'allDealers',
    component: AllDealersComponent

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
