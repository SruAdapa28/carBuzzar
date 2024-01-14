import { Component, OnInit } from '@angular/core';
import { car } from 'src/app/interfaces/car';
import { CardetailsResponse } from 'src/app/interfaces/cardetailsresponse';
import { rtocharge } from 'src/app/interfaces/rtocharge';
import { SearchedDataElement } from 'src/app/interfaces/searchdataelement';
import { SearchedData } from 'src/app/interfaces/searcheddata';
import { CardetailsService } from 'src/app/services/cardetails/cardetails.service';
import { CityserviceService } from 'src/app/services/cityservice/cityservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  carDetailsService: CardetailsService;
  searchData: SearchedDataElement[] = [];

  cardetailsResponse: CardetailsResponse = {
    status: '',
    message: '',
    errorcode: '',
    data: undefined,
    httpStatusCode: 0,
  };
  latestCarsResponse: any = [];
  latestCars: car[] = [];
  recommendedCarsResponse: any = [];
  recommendedCars: car[] = [];
  rtoCharges: rtocharge[] = [];

  constructor(
    carDetailsService: CardetailsService,
    private cityService: CityserviceService
  ) {
    this.carDetailsService = carDetailsService;
  }

  ngOnInit(): void {
    this.cityService.city$.subscribe((message) => {
      //alert('City ' + message);
      this.reloadPage();
    });
    this.carDetailsService.getLatestCars().subscribe((data) => {
      this.cardetailsResponse = data;
      //console.log(this.cardetailsResponse.data);
      this.latestCarsResponse = this.cardetailsResponse.data;
      console.log('Latest Cars::: ', this.latestCarsResponse);
      this.initializeCars(this.latestCarsResponse);
    });
    this.initializeRecommendedCars();
    console.log('Recommended Cars... ' + this.recommendedCars);
  }

  initializeCars(latestCarsResponse: any) {
    this.latestCars = [];
    //latest car recommendation
    latestCarsResponse.map((latestCar: any) => {
      return latestCar.variants.forEach((variant: any) => {
        variant.onRoadPrice = this.calculateOnRoadPrice(
          variant.exShowroomPrice
        );
        // console.log('OnRoadPrice::: ' + variant.onRoadPrice);

        variant.fastTag = this.cityService.getFastTagCharge();
      });
    });

    latestCarsResponse.forEach((latestCar: any) => {
      let car = {
        id: latestCar.id,
        carName: latestCar.name,
        brandName: latestCar.brand.name,
        onRoadPrice: latestCar.variants[0].onRoadPrice,
        engine: latestCar.variants[0].engine,
        mileage: latestCar.variants[0].mileage,
        transmission: latestCar.variants[0].transmissionType,
        image: latestCar.imageUrlList[0],
      };
      this.latestCars.push(car);
    });

    this.latestCars.sort(() => Math.random() - 0.5);
    console.log('Cars...');
    console.log(this.latestCars);
    //localStorage.setItem('latestCar', JSON.stringify(latestCars));

    // this.searchData = [
    //   { key: 'Tiago', count: 1 },
    //   { key: 'Swift', count: 3 },
    // ];

    // localStorage.setItem('searchData', JSON.stringify(this.searchData));
  }

  initializeRecommendedCars() {
    if (localStorage.getItem('searchData') === null) {
      console.log('no data available in local storage...');
      this.searchData = [];
    } else {
      let searchData1 = JSON.parse(localStorage.getItem('searchData')!);
      //console.log('Search Data1 local Storage... ', searchData1);

      searchData1.forEach((element: SearchedDataElement) => {
        this.searchData.push(element);
      });
    }
    this.carDetailsService
      .getRecommendations(this.searchData)
      .subscribe((data) => {
        //console.log('read...', data);
        this.cardetailsResponse = data;
        this.recommendedCarsResponse = this.cardetailsResponse.data;
        //console.log(
        //'Recommended Cars Response... ',
        //this.recommendedCarsResponse
        //);

        this.recommendedCarsResponse.map((recommendedCar: any) => {
          return recommendedCar.variants.forEach((variant: any) => {
            variant.onRoadPrice = this.calculateOnRoadPrice(
              variant.exShowroomPrice
            );
            //console.log('OnRoadPrice::: ' + variant.onRoadPrice);

            variant.fastTag = this.cityService.getFastTagCharge();
          });
        });

        this.recommendedCars = [];
        this.recommendedCarsResponse.sort(() => Math.random() - 0.5);
        this.recommendedCarsResponse.forEach((recommendedCar: any) => {
          let car = {
            id: recommendedCar.id,
            carName: recommendedCar.name,
            brandName: recommendedCar.brand.name,
            onRoadPrice: recommendedCar.variants[0].onRoadPrice,
            engine: recommendedCar.variants[0].engine,
            mileage: recommendedCar.variants[0].mileage,
            transmission: recommendedCar.variants[0].transmissionType,
            image: recommendedCar.imageUrlList[0],
          };
          this.recommendedCars.push(car);
        });
      });
  }

  calculateOnRoadPrice(exShowroomPrice: any) {
    //console.log('EXShowRoomPrice', exShowroomPrice);

    this.rtoCharges = this.cityService.getRtoCharges();
    //console.log('RTO CHARGES>>> ' + this.rtoCharges);

    let onRoadPrice = 0;
    let fastTagCharge = this.cityService.getFastTagCharge();

    this.rtoCharges.forEach((rtoCharge: any) => {
      if (
        exShowroomPrice < rtoCharge.maxPrice &&
        exShowroomPrice >= rtoCharge.minPrice
      ) {
        onRoadPrice =
          exShowroomPrice +
          fastTagCharge +
          (exShowroomPrice * rtoCharge.percentage) / 100;
        // console.log(true);
        // console.log(fastTagCharge);
      }
    });

    //console.log('OnRoadPrice... ' + onRoadPrice);
    return onRoadPrice;
  }

  reloadPage() {
    this.carDetailsService.getLatestCars().subscribe((data) => {
      this.cardetailsResponse = data;
      //console.log(this.cardetailsResponse.data);
      this.latestCarsResponse = this.cardetailsResponse.data;
      console.log('Latest Cars::: ', this.latestCarsResponse);
      this.initializeCars(this.latestCarsResponse);
    });
    this.initializeRecommendedCars();
    console.log('Recommended Cars... ' + this.recommendedCars);
  }
}
