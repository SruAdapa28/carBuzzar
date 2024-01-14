import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export {SearchDto};


interface SearchDto{
  // carType : String,
  // brandId : number,
  // modelId : number,
  // price : number,
  // seater: string[],
  // safetyRatings : number[],
  // transmissions : string[],

  // airBags: number,
  // bodyType: string,
  // fuelType: string,
  // maxPrice: number,
  // mileage: number,
  // minPrice: number,
  // safetyRatings: number,
  // seatCapacity: number,
  // transmissionType: string



    airBags: number,
    bodyType: string[]
    brandName: string,
    brandNames : string[],
    carName: string,
    carType:string,
    city: string,
    color: string,
    fuelType :string[],
    kilometersDriven: number,
    maxPrice: number,
    mileage: number,
    minPrice: number,
    ownerType: string[],
    safetyRatings: number,
    seatCapacity: number[],
    transmissionType: string[]
}
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchDto:SearchDto={
    "airBags": 0,
    "bodyType": [

    ],
    "brandName": "",
    "brandNames": [

    ],
    "carName": "",
    "carType": "New",
    "city": "",
    "color": "",
    "fuelType": [

    ],
    "kilometersDriven": 0,
    "maxPrice": 0,
    "mileage": 0,
    "minPrice": 0,
    "ownerType": [

    ],
    "safetyRatings": 0,
    "seatCapacity": [

    ],
    "transmissionType": [

    ]
  };

  variantList: any[]=[];
  constructor(private http: HttpClient) {

  }

  setSearchDto(searchDto :SearchDto){
    this.searchDto = searchDto;
  }

  getSearchDto(){
    return this.searchDto;
  }


  getSearchVariants(){
    console.log(this.searchDto);
    return this.http.post<any>("https://dealer-service-urtjok3rza-wl.a.run.app/search/", this.searchDto);
    // return this.http.get<any>("../../assets/variantsResponseTemp.json");
  }


}
