import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CardetailsResponse } from 'src/app/interfaces/cardetailsresponse';
import { CardetailsService } from 'src/app/services/cardetails/cardetails.service';
import { CityserviceService } from 'src/app/services/cityservice/cityservice.service';
import { DealerService } from 'src/app/services/dealer.service';
import { VariantService } from 'src/app/services/variant.service';

@Component({
  selector: 'app-oldcars',
  templateUrl: './oldcars.component.html',
  styleUrls: ['./oldcars.component.css'],
})
export class OldcarsComponent implements OnInit {
  carDetailsService: CardetailsService;
  cardetailsResponse: CardetailsResponse = {
    status: '',
    message: '',
    errorcode: '',
    data: undefined,
    httpStatusCode: 0,
  };
  oldCars: any[] = [];
  router: Router;

  oldCarsSelected: any[] = [];
  compareLengthOld: number = 0;
  allowedCarsToCompare: number = 0;
  selectedCar: boolean = false;
  compareCarsModal: boolean = false;
  carChecked: boolean[] = [];

  constructor(
    cardetailsService: CardetailsService,
    router: Router,
    private cityService: CityserviceService,
    private dealerService: DealerService,
    private variantService: VariantService,
    private sanitizer: DomSanitizer
  ) {
    this.carDetailsService = cardetailsService;
    this.router = router;
  }
  cityName: string = '';

  ngOnInit(): void {
    //console.log('init');
    this.cityService.city$.subscribe((message) => {
      //alert('City ' + message);
      this.cityName = message;
      this.reloadPage();
    });

    this.cityName = this.cityService.getCity();
    this.fetchOldCarData();
    this.allowedCarsToCompare = this.variantService.getAllowedCarsToCompare();
    //srujana used car changes
    this.oldCarsSelected = this.variantService.getOldCarIdsSelected();
    this.compareLengthOld = this.oldCarsSelected.length;
  }

  fetchOldCarData() {
    console.log('fetch old data');

    this.carDetailsService
      .getOldCarsInCity(
        'https://dealer-service-urtjok3rza-wl.a.run.app/oldcar/city/{cityName}?cityName=' +
          this.cityName
      )
      .subscribe((data) => {
        this.cardetailsResponse = data;
        console.log('oldcar response... ', this.cardetailsResponse.data);
        //this.initiateValues(this.cardetailsResponse.data);
        this.oldCars = this.cardetailsResponse.data;
        this.oldCars = this.oldCars.map((car) => {
          car.imageUrlList = car.imageUrlList.map((image: any) => {
            image = this.sanitizer.bypassSecurityTrustResourceUrl(
              'data:image/jpg;base64,' + image
            );
            return image;
          });
          return car;
        });
        this.oldCars.sort((car1, car2) => car1.dealerPrice - car2.dealerPrice);
        console.log('old cars... ', this.oldCars);
      });
  }

  moveToDetails(id: any) {
    //alert(id);
    this.router.navigate(['details', 'old', id]);
  }

  reloadPage() {
    this.fetchOldCarData();
    this.allowedCarsToCompare = this.variantService.getAllowedCarsToCompare();
    //srujana used car changes
    this.oldCarsSelected = this.variantService.getOldCarIdsSelected();
    this.compareLengthOld = this.oldCarsSelected.length;
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
    //console.log('onCheckIfSelected');
    //console.log(id);
    for (let item of this.oldCarsSelected) {
      //console.log('OldCars Id ' + item);
      if (item == id) {
        return true;
      }
    }

    return false;
  }

  selectCarToCompare(event: any) {
    console.log('event.target ' + event.target.value);

    if (event.target.checked) {
      this.oldCarsSelected.push(event.target.value);
      this.variantService.fetchAddOldCars(this.oldCarsSelected);
      console.log('Fetched Used Car to compare ' + this.oldCarsSelected);
    } else {
      let i: number = 0;
      this.oldCarsSelected.forEach((item, index) => {
        if (item === event.target.value) {
          this.oldCarsSelected.splice(index, 1);
          console.log('Selected Used Car to compare ' + this.oldCarsSelected);
          this.variantService.removeSelectedOldCar(item);
        }
      });

      // this.variantService.fetchAddOldCars(this.oldCarsSelected);
    }
    this.compareLengthOld = this.oldCarsSelected.length;
    // this.variantService.fetchAddOldCars(this.oldCarsSelected);

    console.log('Compare length ' + this.compareLengthOld);
  }

  compareSelectedCars() {
    console.log('On click of compare');

    if (this.compareLengthOld == 0) {
      this.compareCarsModal = true;
      return;
    }

    console.log('Compare Used ' + this.oldCarsSelected);
    this.router.navigate(['compare', 'Used']);
  }

  OnClickCloseCompareCarsModal() {
    this.compareCarsModal = false;
  }

  onSearchKnowYourDealer(dealerId: any) {
    this.router.navigate(['dealer', dealerId]);
  }

  sortByPrice(event: any) {
    if (event.target.value === 'lth') {
      this.oldCars.sort(
        (a, b) => parseFloat(a.dealerPrice) - parseFloat(b.dealerPrice)
      );
    }
    if (event.target.value === 'htl') {
      this.oldCars.sort(
        (a, b) => parseFloat(b.dealerPrice) - parseFloat(a.dealerPrice)
      );
    }
  }
}
