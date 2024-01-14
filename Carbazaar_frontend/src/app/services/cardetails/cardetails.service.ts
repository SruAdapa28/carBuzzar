import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardetailsResponse } from 'src/app/interfaces/cardetailsresponse';
import { CityserviceService } from '../cityservice/cityservice.service';

@Injectable({
  providedIn: 'root',
})
export class CardetailsService {
  oldcar_url: string =
    'https://dealer-service-urtjok3rza-wl.a.run.app/oldcar/city/{cityName}?cityName=';

  car_service_url: string = 'https://car-service-urtjok3rza-wl.a.run.app/';
  dealer_service_url: string =
    'https://dealer-service-urtjok3rza-wl.a.run.app/';

  constructor(
    private httpClient: HttpClient,
    private cityService: CityserviceService
  ) {}

  getCarDetails(url: string): Observable<any> {
    //return this.httpClient.get('http://localhost:8291/cars/1');
    return this.httpClient.get(url);
  }

  getCarVariantDetails(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  getOldCarsInCity(url: string): Observable<any> {
    //console.log('old car');

    //this.oldcar_url = this.oldcar_url + 'Bhubaneswar';
    this.oldcar_url = this.oldcar_url + this.cityService.getCity();
    return this.httpClient.get(url);
  }

  getNewCarsInCity(): Observable<any> {
    return this.httpClient.get(
      this.dealer_service_url + 'newcar/city?city=' + this.cityService.getCity()
    );
  }

  getLatestCars(): Observable<any> {
    //'http://localhost:8083/newcar/latest/city?city=Bhubaneswar'
    return this.httpClient.get(
      this.dealer_service_url +
        'newcar/latest/city?city=' +
        this.cityService.getCity()
    );
  }

  getVariantDetails(carName: string, variantName: string): Observable<any> {
    return this.httpClient.get(
      this.car_service_url +
        'cars/variant?carName=' +
        carName +
        '&variantName=' +
        variantName
    );
  }

  getRecommendations(searchData: any): Observable<any> {
    console.log('search data... ', searchData);
    //'http://localhost:8291/recommendation?city=Bhubaneswar'
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post(
      this.car_service_url +
        'recommendation?city=' +
        this.cityService.getCity(),
      searchData,
      { headers: headers }
    );
  }

  getSimilarCars(id: any): Observable<any> {
    //'http://localhost:8291/cars/similar?variantId=' + id
    return this.httpClient.get(
      this.car_service_url + 'cars/similar?variantId=' + id
    );
  }

  getCarImages(carName: string): Observable<any> {
    return this.httpClient.get(
      this.car_service_url + 'car/images?carName=' + carName
    );
  }
}
