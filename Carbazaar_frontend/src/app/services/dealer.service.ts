import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CityserviceService } from './cityservice/cityservice.service';

@Injectable({
  providedIn: 'root',
})
export class DealerService {
  private dealer: any[] = [];
  dealerListToCompare: any[] = [];
  carName: any;
  cityName: any;
  variantName: any;

  constructor(
    private http: HttpClient,
    private cityService: CityserviceService
  ) {}

  getAllDealers() {
    console.log('ALL Dealers');

    let city = this.cityService.getCity();
    console.log('City... ' + city);

    return this.http.get<any>(
      'https://dealer-service-urtjok3rza-wl.a.run.app/dealer/city/' + city
    );
  }

  getDealerById(id: number) {
    console.log('id in service ' + id);
    return this.http.get<any>(
      'https://dealer-service-urtjok3rza-wl.a.run.app/dealer/' + id
    );
  }
  getDealerListToCompare() {
    return this.dealerListToCompare;
  }

  setDealerListToCompare(dealerListToCompare: any[]) {
    this.dealerListToCompare = dealerListToCompare;
  }
  setDetailsForDealerCompare(carName: any, cityName: any, variantName: any) {
    this.carName = carName;
    this.cityName = cityName;
    this.variantName = variantName;
  }

  getDealersToCompare() {
    let requestUrl =
      'https://dealer-service-urtjok3rza-wl.a.run.app/newcar/compare/dealer?carName=' +
      this.carName +
      '&city=Bhubaneswar' +
      '&variantName=' +
      this.variantName;
    // let requestUrl = "../../assets/dealerCompareResponseTemp.json";
    return this.http.get<any>(requestUrl);
  }

  getVariantByName() {
    let requestUrl =
      'https://car-service-urtjok3rza-wl.a.run.app/cars/variant?carName=' +
      this.carName +
      '&variantName=' +
      this.variantName;
    return this.http.get<any>(requestUrl);
  }
}
