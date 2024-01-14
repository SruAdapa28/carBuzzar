import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CardetailsService } from 'src/app/services/cardetails/cardetails.service';
import { CityserviceService } from 'src/app/services/cityservice/cityservice.service';
import { DealerService } from 'src/app/services/dealer.service';
import { VariantService } from 'src/app/services/variant.service';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css'],
})
export class DealerComponent implements OnInit {
  dealer: any = { brand: { name: '' } };
  p: number = 1;
  oldCars: any[] = [];
  newCars: any[] = [];
  isNewCarsAvailable: boolean = false;
  isOldCarsAvailable: boolean = false;
  isNewCarsHead: boolean = false;
  isOldCarsHead: boolean = false;
  isBothCarsHead: boolean = false;
  isNewCar: boolean = false;
  isOldCar: boolean = false;
  isNewCarShown: boolean = false;
  isOldCarShown: boolean = false;
  newCarIdsSelected: any[] = [];
  newCarsSelected: any[] = [];
  oldCarsSelected: any[] = [];
  compareLength: number = 0;
  compareLengthOld: number = 0;
  allowedCarsToCompare: number = 0;
  selectedCar: boolean = false;
  cartype: string = '';
  currentNewCarId: number = 0;
  compareCarsModal: boolean = false;
  rtoCharges: any = [];

  constructor(
    private route: ActivatedRoute,
    private dealerService: DealerService,
    private router: Router,
    private variantService: VariantService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private cityService: CityserviceService,
    private carService: CardetailsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log('Id' + id);
    this.dealerService.getDealerById(id).subscribe((response: any) => {
      this.dealer = response;
      this.oldCars = response.oldCars;
      this.newCars = response.newCars;

      this.oldCars.map((oldCar) => {
        let imageUrlLists = oldCar.imageUrlList;
        oldCar.imageUrlList = imageUrlLists.map((image: any) => {
          return (image = this.sanitizer.bypassSecurityTrustResourceUrl(
            'data:image/jpg;base64,' + image
          ));
        });
      });

      this.newCars.map((newCar: any) => {
        let carName = newCar.carName;
        this.carService
          .getCarImages(carName)
          .subscribe((response: { data: any }) => {
            let imageUrlList = response.data;
            newCar.imageUrlList = imageUrlList.map((image: any) => {
              return (image = this.sanitizer.bypassSecurityTrustResourceUrl(
                'data:image/jpg;base64,' + image
              ));
            });
            console.log('NEW CAR... ', newCar);
          });
      });

      this.cartype = response.carType;
      if (this.cartype === 'NEW') {
        this.isNewCarsHead = true;
        this.isNewCarShown = true;
      }
      if (this.cartype === 'OLD') {
        this.isOldCarsHead = true;
        this.isOldCarShown = true;
      }
      if (this.cartype === 'BOTH') {
        this.isBothCarsHead = true;
        this.isNewCarShown = true;
      }
      console.log('Response', this.dealer);
      console.log('NewCar', this.newCars);
      console.log('Oldcar', this.oldCars);
    });
    if (this.oldCars.length > 0) {
      this.isOldCarsAvailable = true;
    }
    if (this.newCars.length > 0) {
      this.isNewCarsAvailable = true;
    }

    // srujana new car changes
    this.allowedCarsToCompare = this.variantService.getAllowedCarsToCompare();
    this.newCarsSelected = this.variantService.getNewCarIdsSelected();
    this.compareLength = this.newCarsSelected.length;

    //srujana used car changes
    this.oldCarsSelected = this.variantService.getOldCarIdsSelected();
    this.compareLengthOld = this.oldCarsSelected.length;
  }
  toggleShowNew() {
    if (this.newCars.length > 0) {
      this.isNewCarShown = true;
      this.isOldCarShown = false;
    } else {
      this.isOldCarShown = true;
      this.isNewCarShown = false;
    }
  }
  toggleShowOld() {
    this.isOldCarShown = true;
    this.isNewCarShown = false;
  }

  //move to details
  moveToUsedCarDetails(id: any) {
    console.log(this.isNewCarShown);
    this.router.navigate(['details', 'old', id]);
  }

  moveToNewCarDetails(carName: any, variantName: any) {
    console.log('In moveToNewCarDetails');
    this.currentNewCarId = 0;

    let requestUrl =
      'https://car-service-urtjok3rza-wl.a.run.app/cars/variant?carName=' +
      carName +
      '&variantName=' +
      variantName;

    console.log('Request Url ' + requestUrl);

    this.http.get<any>(requestUrl).subscribe((response: any) => {
      this.currentNewCarId = response.data.carId;
      console.log('New Car Id ' + this.currentNewCarId);
      this.moveToNewRouterNavigate(this.currentNewCarId);
    });
  }

  moveToNewRouterNavigate(newCarId: any) {
    this.router.navigate(['details', 'new', newCarId]);
  }

  // moveToNewCarDetails(variantId:any){
  //   this.router.navigate(['details', 'new', variantId]);
  // }

  selectNewCarToCompare(event: any) {
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
    //setting new Car ids selected in variant service
    this.variantService.setNewCarIdsSelected(this.newCarsSelected);
    console.log('Selected New Car to compare ' + this.newCarsSelected);
    this.variantService.fetchNewVariantsById(this.newCarsSelected);
    this.compareLength = this.newCarsSelected.length;

    console.log('Compare length ' + this.compareLength);
  }

  // selectNewCarToCompare( carName:any,variantName:any){

  //     if(!this.onCheckNewIfSelected(carName, variantName)){
  //       this.newCarsSelected.push({carName, variantName});
  //       let requestUrl =
  //       'https://car-service-urtjok3rza-wl.a.run.app/cars/variant?carName=' +
  //       carName +
  //       '&variantName=' +
  //       variantName;
  //       console.log("Request Url " + requestUrl);

  //      this.http.get<any>(requestUrl).subscribe((response: any) => {
  //        console.log("Response data");
  //        console.log(response.data.id);
  //       let currentVariantId = response.data.id;
  //        console.log("New Car Id " + currentVariantId);
  //       if(!this.onCheckNewCarsIdSelected(currentVariantId)){
  //         console.log("Id not present in newCarIdsSelected ") , currentVariantId;

  //         this.newCarIdsSelected.push(currentVariantId);
  //       }

  //       console.log("newCarIdsSelected ", this.newCarIdsSelected);

  //       this.variantService.setNewCarNamesSelected(this.newCarsSelected);
  //       this.variantService.setNewCarIdsSelected(this.newCarIdsSelected);
  //       this.variantService.fetchNewVariantsById(this.newCarIdsSelected);
  //       this.newCarsSelected= this.variantService.getNewCarNamesSelected();
  //       this.compareLength = this.newCarIdsSelected.length;
  //     });
  //     }else{
  //         let i : number = 0;
  //         this.newCarsSelected.forEach((item,index)=>{
  //           if(item.carName=== carName && item.variantName===variantName){
  //             this.newCarsSelected.splice(index,1);
  //             this.newCarIdsSelected.splice(index,1);
  //           }
  //         });
  //     }

  //     console.log("Selected New Car to compare " , this.newCarsSelected);

  //     console.log("New Car Ids Selected ", this.newCarIdsSelected);

  //     this.variantService.setNewCarIdsSelected(this.newCarIdsSelected);
  //     this.variantService.fetchNewVariantsById(this.newCarIdsSelected);
  //     this.compareLength = this.newCarIdsSelected.length;
  // }

  selectUsedCarToCompare(event: any) {
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

    console.log('Compare length old' + this.compareLengthOld);
  }

  compareDealers(carName: any, cityName: any, variantName: any) {
    this.dealerService.setDetailsForDealerCompare(
      carName,
      cityName,
      variantName
    );
    this.router.navigate(['dealerCompare']);
  }

  compareSelectedCars() {
    console.log('On click of compare');

    if (this.cartype == 'NEW') {
      if (this.compareLength == 0) {
        this.compareCarsModal = true;
        return;
      }
      console.log('Compare New ' + this.newCarIdsSelected);
      this.router.navigate(['compare', 'New']);
    } else {
      if (this.compareLengthOld == 0) {
        this.compareCarsModal = true;
        return;
      }
      console.log('Compare Used ' + this.oldCarsSelected);
      this.router.navigate(['compare', 'Used']);
    }
  }

  OnClickCloseCompareCarsModal() {
    this.compareCarsModal = false;
  }

  onCheckNewIfSelected(variantId: any): boolean {
    console.log('onCheckIfSelected');
    let selectCar: boolean = false;
    for (let item of this.newCarsSelected) {
      // console.log("NewCars Id " + item.carName +" " + item.variantName);
      if (item == variantId) {
        return true;
      }
    }
    return false;
  }

  onCheckUsedIfSelected(id: any): boolean {
    for (let item of this.oldCarsSelected) {
      console.log('OldCars Id ' + item);
      if (item == id) {
        return true;
      }
    }
    return false;
  }

  onCheckNewCarsIdSelected(id: any): boolean {
    for (let item of this.newCarIdsSelected) {
      console.log('Id already present in new Car ' + item);
      if (item == id) {
        return true;
      }
    }
    return false;
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
        let rto = (exShowroomPrice * rtoCharge.percentage) / 100;
        //console.log('rto', rto);
        //this.rtoCharge = rto;
        onRoadPrice = exShowroomPrice + fastTagCharge + rto;
        // console.log(true);
        // console.log(fastTagCharge);
      }
    });

    //console.log('OnRoadPrice... ' + onRoadPrice);
    return onRoadPrice;
  }
}
