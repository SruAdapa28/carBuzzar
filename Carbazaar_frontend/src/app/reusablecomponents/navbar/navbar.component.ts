import { Component, OnInit } from '@angular/core';
import { city } from 'src/app/interfaces/city';
import { rtocharge } from 'src/app/interfaces/rtocharge';
import { CityserviceService } from 'src/app/services/cityservice/cityservice.service';
import { RtodetailsService } from 'src/app/services/rtodetails/rtodetails.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cities: city[] = [];
  selectedCity: string = 'Bhubaneswar';
  rtocharges: rtocharge[] = [];
  constructor(
    private rtoService: RtodetailsService,
    private cityService: CityserviceService
  ) {}

  ngOnInit(): void {
    //this.rtocharges = [];
    let city = localStorage.getItem('city');
    if (city != null) {
      this.selectedCity = city;
    }

    this.rtoService.getAllCities().subscribe((data) => {
      this.cities = data.data;
      //console.log('All Cities.. ', this.cities);
      //this.fetchCityRtoCharges(this.selectedCity);
    });
  }

  cityChangeHandler() {
    localStorage.setItem('city', this.selectedCity);
    this.rtocharges = [];
    //console.log('City Changed... ' + this.selectedCity);
    this.fetchCityRtoCharges(this.selectedCity);
    this.cityService.setCity(this.selectedCity);
  }

  fetchCityRtoCharges(cityName: string) {
    this.rtoService.getRTOCharges(cityName).subscribe((data) => {
      //console.log('RTO Charges... ', data.data);
      data.data.forEach((element: any) => {
        let rtoCharge = {
          minPrice: element.minPrice,
          maxPrice: element.maxPrice,
          percentage: element.rtoPricePercentage,
        };
        this.rtocharges.push(rtoCharge);
      });
      //console.log('RTO Charges... ', this.rtocharges);
      this.cityService.setRtoCharges(this.rtocharges);
    });
  }
}
