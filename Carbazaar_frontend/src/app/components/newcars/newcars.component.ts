import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CardetailsResponse } from 'src/app/interfaces/cardetailsresponse';
import { rtocharge } from 'src/app/interfaces/rtocharge';
import { SearchedDataElement } from 'src/app/interfaces/searchdataelement';
import { CardetailsService } from 'src/app/services/cardetails/cardetails.service';
import { DealerService } from 'src/app/services/dealer.service';
import { VariantService } from 'src/app/services/variant.service';
import { CityserviceService } from 'src/app/services/cityservice/cityservice.service';

@Component({
  selector: 'app-newcars',
  templateUrl: './newcars.component.html',
  styleUrls: ['./newcars.component.css'],
})
export class NewcarsComponent implements OnInit {
  carDetailsService: CardetailsService;
  cardetailsResponse: CardetailsResponse = {
    status: '',
    message: '',
    errorcode: '',
    data: undefined,
    httpStatusCode: 0,
  };
  newCars: any[] = [];
  router: Router;
  searchDataResponse: any = [];
  searchDataRequest: any = [];
  found: boolean = false;
  p: number = 1;

  newCarsSelected: any[] = [];
  compareLength: number = 0;
  allowedCarsToCompare: number = 0;
  selectedCar: boolean = false;
  compareCarsModal: boolean = false;
  carChecked: boolean[] = [];
  rtoCharges: rtocharge[] = [];
  city: string = '';

  //   constructor(carDetailsService: CardetailsService, router: Router, private dealerService : DealerService, private variantService:VariantService, private cityService: CityserviceService)

  //  {
  constructor(
    carDetailsService: CardetailsService,
    router: Router,
    private cityService: CityserviceService,
    private sanitizer: DomSanitizer,
    private dealerService: DealerService,
    private variantService: VariantService
  ) {
    this.carDetailsService = carDetailsService;
    this.router = router;
  }

  ngOnInit(): void {
    this.cityService.city$.subscribe((message) => {
      //alert('City ' + message);
      this.reloadPage();
      this.city = message;
    });

    this.city = this.cityService.getCity();
    this.carDetailsService.getNewCarsInCity().subscribe((data) => {
      this.cardetailsResponse = data;
      console.log(this.cardetailsResponse.data);
      //this.initiateValues(this.cardetailsResponse.data);
      this.newCars = this.cardetailsResponse.data;

      this.newCars.map((newCar: any) => {
        newCar.imageUrlList = newCar.imageUrlList.map((image: any) => {
          return (image = this.sanitizer.bypassSecurityTrustResourceUrl(
            'data:image/jpg;base64,' + image
          ));
        });
        return newCar.variants.forEach((variant: any) => {
          variant.onRoadPrice = this.calculateOnRoadPrice(
            variant.exShowroomPrice
          );
          variant.fastTag = this.cityService.getFastTagCharge();
        });
      });

      this.newCars.sort((carA, carB) => {
        return (
          carA.variants[0].exShowroomPrice - carB.variants[0].exShowroomPrice
        );
      });
      console.log('NEW Cars... ', this.newCars);
    });

    this.allowedCarsToCompare = this.variantService.getAllowedCarsToCompare();
    this.newCarsSelected = this.variantService.getNewCarIdsSelected();
    this.compareLength = this.newCarsSelected.length;
  }

  moveToDetails(id: any, carName: string) {
    //alert(id);
    this.searchDataResponse = JSON.parse(localStorage.getItem('searchData')!);
    console.log('Search Data Response... ', this.searchDataResponse);

    if (this.searchDataResponse !== null) {
      this.searchDataResponse.map((data: SearchedDataElement) => {
        if (data.key === carName) {
          this.found = true;
          data.count = data.count + 1;
        }
        //this.searchDataRequest.push(data);
      });

      console.log(
        'Search Data Request... ',
        this.searchDataResponse,
        ' flag ',
        this.found
      );

      if (!this.found) {
        this.searchDataResponse.push({ key: carName, count: 1 });
      }

      localStorage.setItem(
        'searchData',
        JSON.stringify(this.searchDataResponse)
      );
    } else {
      console.log('else bock...');

      this.searchDataRequest.push({ key: carName, count: 1 });
      localStorage.setItem(
        'searchData',
        JSON.stringify(this.searchDataRequest)
      );
    }
    this.router.navigate(['details', 'new', id]);
  }

  compareDealers(carName: any, cityName: any, variantName: any) {
    this.dealerService.setDetailsForDealerCompare(
      carName,
      cityName,
      variantName
    );
    this.router.navigate(['dealerCompare']);
  }

  onCheckIfSelected(id: any): boolean {
    // console.log('onCheckIfSelected');
    //console.log(id);
    for (let item of this.newCarsSelected) {
      console.log('NewCars Id ' + item);
      if (item == id) {
        return true;
      }
    }

    return false;
  }

  selectCarToCompare(event: any) {
    console.log('event.target ' + event.target.value);

    if (event.target.checked) {
      this.newCarsSelected.push(event.target.value);
    } else {
      let i: number = 0;
      this.newCarsSelected.forEach((item, index) => {
        if (item === event.target.value) {
          this.newCarsSelected.splice(index, 1);
        }
      });
    }
    this.variantService.setNewCarIdsSelected(this.newCarsSelected);
    console.log('Selected New Car to compare ' + this.newCarsSelected);
    this.variantService.fetchNewVariantsById(this.newCarsSelected);
    this.compareLength = this.newCarsSelected.length;

    console.log('Compare length ' + this.compareLength);
  }

  compareSelectedCars() {
    console.log('On click of compare');

    if (this.compareLength == 0) {
      this.compareCarsModal = true;
      return;
    }

    console.log('Compare New ' + this.newCarsSelected);
    this.router.navigate(['compare', 'New']);
  }

  OnClickCloseCompareCarsModal() {
    this.compareCarsModal = false;
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
    this.carDetailsService.getNewCarsInCity().subscribe((data) => {
      this.cardetailsResponse = data;
      console.log(this.cardetailsResponse.data);
      //this.initiateValues(this.cardetailsResponse.data);
      this.newCars = this.cardetailsResponse.data;

      this.newCars.map((newCar: any) => {
        newCar.imageUrlList = newCar.imageUrlList.map((image: any) => {
          return (image = this.sanitizer.bypassSecurityTrustResourceUrl(
            'data:image/jpg;base64,' + image
          ));
        });
        return newCar.variants.forEach((variant: any) => {
          variant.onRoadPrice = this.calculateOnRoadPrice(
            variant.exShowroomPrice
          );
          variant.fastTag = this.cityService.getFastTagCharge();
        });
      });

      this.newCars.sort((carA, carB) => {
        return (
          carA.variants[0].exShowroomPrice - carB.variants[0].exShowroomPrice
        );
      });
      console.log('NEW Cars... ', this.newCars);
    });

    this.allowedCarsToCompare = this.variantService.getAllowedCarsToCompare();
    this.newCarsSelected = this.variantService.getNewCarIdsSelected();
    this.compareLength = this.newCarsSelected.length;
  }
  sortByPrice(event: any) {
    if (event.target.value === 'lth') {
      this.newCars.sort(
        (a, b) =>
          parseFloat(a.variants[0].exShowroomPrice) -
          parseFloat(b.variants[0].exShowroomPrice)
      );
    }
    if (event.target.value === 'htl') {
      this.newCars.sort(
        (a, b) =>
          parseFloat(b.variants[0].exShowroomPrice) -
          parseFloat(a.variants[0].exShowroomPrice)
      );
    }
  }
}
