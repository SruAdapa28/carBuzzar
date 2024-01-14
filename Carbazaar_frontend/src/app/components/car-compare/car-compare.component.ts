import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { VariantService } from 'src/app/services/variant.service';
import { car } from 'src/app/interfaces/car';
import { ActivatedRoute, Route } from '@angular/router';
import { DealerService } from 'src/app/services/dealer.service';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';

import { CardetailsResponse } from 'src/app/interfaces/cardetailsresponse';
import { CardetailsService } from 'src/app/services/cardetails/cardetails.service';
import { SearchedDataElement } from 'src/app/interfaces/searchdataelement';
@Component({
  selector: 'app-car-compare',
  templateUrl: './car-compare.component.html',
  styleUrls: ['./car-compare.component.css'],
})
export class CarCompareComponent implements OnInit {
  serialNo = 0;
  headerRequired = false;
  route: ActivatedRoute;
  carType:any;
  selectedVariants : any[] = [];
  brands:any[]=[];
  brandId : number =0;
  brandName:string="";
  models:any[]=[];
  modelName : string="";
  modelId:number=0;
  variants:any[]=[];
  variantName:string="";
  allowedCarsToCompare:number=0;
  carNamesTitle:string="";

  cardetailsResponse: CardetailsResponse = {
    status: '',
    message: '',
    errorcode: '',
    data: undefined,
    httpStatusCode: 0,
  };
  recommendedCarsResponse: any = [];
  recommendedCars: car[] = [];
  carDetailsService: CardetailsService;
  searchData: SearchedDataElement[] = [];

  constructor(
    private variantService: VariantService,
    private searchService: SearchService,
    route: ActivatedRoute,
    private dealerService: DealerService,
    private router: Router,
    private brandService: BrandService,
    carDetailsService: CardetailsService
  ) {
    this.route = route;
    this.carDetailsService = carDetailsService;
  }

  ngOnInit(): void {
    this.carType = this.route.snapshot.params['type'];
    console.log('type::: ' + this.carType);
    this.selectedVariants = this.variantService.getSelectedVariants(
      this.carType
    );
    console.log('car compare onInit ');
    console.log(this.selectedVariants);

    this.brandService.fetchBrand().subscribe((response: any) => {
      console.log(response.data);
      this.brands = response.data;
    });
    console.log(this.brands);
    this.allowedCarsToCompare = this.variantService.getAllowedCarsToCompare();
    this.carNamesTitle= this.variantService.getCarNamesTitle();
    console.log("Car compare Title " + this.carNamesTitle);

    this.initializeRecommendedCars();
  }

  compareDealers(carName: any, cityName: any, variantName: any) {
    this.dealerService.setDetailsForDealerCompare(
      carName,
      cityName,
      variantName
    );
    this.router.navigate(['dealerCompare']);
  }

  setBrandId(event: any) {
    this.brandId = event.target.value;
    console.log('Brand = ' + this.brandId);
    this.brandService
      .fetchModelsBasedOnBrands(this.brandId)
      .subscribe((response: any) => {
        this.models = response.data;
        console.log('Brand Name ');
        this.brandName = response.data[0].brand.name;

        console.log(response.data[0].brand.name);
      });

    console.log('Models ' + this.models);
  }

  setModelId(event: any) {
    console.log(event);
    this.modelId = event.target.value;
    // this.modelName = event.target.value.name;
    console.log('Model Id = ' + this.modelId);
    this.variantService
      .getVariantListByCarId(this.modelId)
      .subscribe((response: any) => {
        this.modelName = response.data.name;
        console.log(this.modelName);
        this.variants = response.data.variants;
        console.log('Variant List ' + this.variants);
      });
  }

  setVariantName(event: any) {
    this.variantName = event.target.value;
    console.log('Variant = ' + this.variantName);
  }

  addToCompare() {
    this.variantService.getVariantByCarNameVariantName(
      this.modelName,
      this.variantName
    );
    this.selectedVariants = this.variantService.getSelectedVariants('New');
    console.log('Add To Compare this.selectedVariants');
    console.log(this.selectedVariants);
    // this.carNamesTitle= this.variantService.getCarNamesTitle();
    // console.log("Add to compare Title " + this.carNamesTitle);
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
        console.log('read...', data);
        this.cardetailsResponse = data;
        this.recommendedCarsResponse = this.cardetailsResponse.data;
        console.log(
          'Recommended Cars Response... ',
          this.recommendedCarsResponse
        );
        this.recommendedCarsResponse.sort(() => Math.random() - 0.5);
        this.recommendedCarsResponse.forEach((recommendedCar: any) => {
          let car = {
            id: recommendedCar.id,
            carName: recommendedCar.name,
            brandName: recommendedCar.brand.name,
            onRoadPrice: recommendedCar.variants[0].exShowroomPrice,
            engine: recommendedCar.variants[0].engine,
            mileage: recommendedCar.variants[0].mileage,
            transmission: recommendedCar.variants[0].transmissionType,
            image: recommendedCar.imageUrlList[0],
          };
          this.recommendedCars.push(car);
        });
      });
  }
}
