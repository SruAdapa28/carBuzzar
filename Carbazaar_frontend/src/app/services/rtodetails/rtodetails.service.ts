import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RtodetailsService {
  rto_service_url: string =
    'https://helper-service-urtjok3rza-wl.a.run.app/helper/rtocharges?cityName=';

  constructor(private httpClient: HttpClient) {}

  getRTOCharges(cityName: string): Observable<any> {
    return this.httpClient.get(this.rto_service_url + cityName);
  }

  getAllCities(): Observable<any> {
    return this.httpClient.get(
      'https://helper-service-urtjok3rza-wl.a.run.app/helper/cities'
    );
  }

  fetchRTOCharge(city: string, price: any): Observable<any> {
    return this.httpClient.get(
      'https://helper-service-urtjok3rza-wl.a.run.app/helper/city/stateRto/city=Bhubaneswar&price=500000'
    );
  }
}
