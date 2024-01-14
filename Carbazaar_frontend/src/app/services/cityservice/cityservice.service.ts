import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { rtocharge } from 'src/app/interfaces/rtocharge';

@Injectable({
  providedIn: 'root',
})
export class CityserviceService {
  currentCity: string = 'Bhubaneswar';
  fasttagCharge: any = 500;
  rtocharges: rtocharge[] = [];
  private _citySource = new Subject<string>();
  city$ = this._citySource.asObservable();

  constructor() {}

  setCity(city: string) {
    this.currentCity = city;
    this._citySource.next(city);
  }

  getCity() {
    return this.currentCity;
  }

  getFastTagCharge() {
    return this.fasttagCharge;
  }

  setRtoCharges(rtocharges: rtocharge[]) {
    this.rtocharges = rtocharges;
    console.log('City Service RTO ', this.rtocharges);
  }

  getRtoCharges() {
    return this.rtocharges;
  }
}
