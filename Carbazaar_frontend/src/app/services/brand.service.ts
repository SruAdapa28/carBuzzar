import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

private brand: any[] =[];
private models: any[] =[];
brandTextChanged = new Subject<void>();
modelTextChanged = new Subject<void>();

getAllBrands() {
  return this.brand;
}
getModels(){
  return this.models;
}
constructor(private http: HttpClient) {
  // this.fetchBrand();
}

fetchBrand(){
  // this.http.get<any>("https://car-service-urtjok3rza-wl.a.run.app/brands/list").subscribe(
  //     (response: any) => {
  //       this.brand = response.data;
  //       console.log(response.data);
  //       this.brandTextChanged.next();
  //     }
  //   )

  return this.http.get<any>("https://car-service-urtjok3rza-wl.a.run.app/brands/list");
}

fetchModelsBasedOnBrands(id: any){
  var requestUrl: string = "https://car-service-urtjok3rza-wl.a.run.app/cars?brandId="+id;
  console.log(requestUrl);
  // this.http.get<any>(requestUrl).subscribe(
  //     (response: any) => {
  //       this.models = response.data;
  //       console.log(response.data);
  //       this.modelTextChanged.next();
  //     }
  //   )

  return this.http.get<any>(requestUrl);
}
}
