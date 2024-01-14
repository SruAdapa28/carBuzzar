import { Component, HostListener } from '@angular/core';
import { rtocharge } from './interfaces/rtocharge';
import { CityserviceService } from './services/cityservice/cityservice.service';
import { RtodetailsService } from './services/rtodetails/rtodetails.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CarBazzar';
  rtocharges: rtocharge[] = [];

  constructor(
    private rtoService: RtodetailsService,
    private cityService: CityserviceService
  ) {
    let city = localStorage.getItem('city');
    let cityName: string = this.cityService.getCity();
    if (city != null) {
      this.cityService.setCity(city);
      cityName = city;
    }

    this.fetchCityRtoCharges(cityName);
  }

  ngOnInit(): void {}

  fetchCityRtoCharges(cityName: string) {
    this.rtoService.getRTOCharges(cityName).subscribe((data) => {
      console.log('RTO Charges... ', data.data);
      data.data.forEach((element: any) => {
        let rtoCharge = {
          minPrice: element.minPrice,
          maxPrice: element.maxPrice,
          percentage: element.rtoPricePercentage,
        };
        this.rtocharges.push(rtoCharge);
      });
      console.log('RTO Charges... ', this.rtocharges);
      this.cityService.setRtoCharges(this.rtocharges);
    });
  }
}
