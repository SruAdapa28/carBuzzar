import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchService } from 'src/app/services/search.service';
import { VariantService } from 'src/app/services/variant.service';
import { Router } from '@angular/router';
import { DealerService } from 'src/app/services/dealer.service';
import { CityserviceService } from 'src/app/services/cityservice/cityservice.service';


@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {

  p : number = 1;
  currPage:number=1;
  selectedVariantsToCompare:any[] =[];

  constructor(private searchService: SearchService,
    private variantService: VariantService,
    router: Router,
    private dealerService: DealerService,
    private sanitizer: DomSanitizer,
    private cityService:CityserviceService
    ) {
    this.router = router;
  }
  car: any;
  carType: any = "";
  newCarsSelected: any[] = [];
  router: Router;
  oldCarsSelected: any[] =[];
  compareLength:number=0;
  allowedCarsToCompare:number=0;
  selectedCar :boolean= false;
  compareCarsModal:boolean= false;
  carChecked:boolean[]=[];
  compareLengthOld:number=0;
  rtoCharges: any = [];
  // newCarNamesSelected:any[]=[];
  // constructor(carDetailsService: CardetailsService, router: Router) {
  //   this.carDetailsService = carDetailsService;
  //   this.router = router;
  // }

  variantList: any[] = [];

  ngOnInit(): void {
    // this.variantList = this.searchService.variantList;
    this.carType= this.searchService.getSearchDto().carType;
    console.log("In ngOnInit " + this.carType);
    this.searchService.getSearchVariants().subscribe(
      (response: any) => {
        if (this.carType == "New") {
          this.variantList = response.data.newCars;

        }else if(this.carType == "Used"){
          this.variantList = response.data.oldCars;
        }

        this.variantList = this.variantList.map((car :any) => {
          car.imageUrlList = car.imageUrlList.map((image : any) => {
            image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + image);
            return image;
          });
          return car;
        })
        console.log("Variant List ");
        console.log(this.variantList);

        console.log(response.data);
      });

      this.allowedCarsToCompare = this.variantService.getAllowedCarsToCompare();
      this.currPage=1;
      console.log("Current page  " + this.currPage);

      //collecting all new cars selected ids from variant service
      this.newCarsSelected= this.variantService.getNewCarIdsSelected();
      this.compareLength= this.newCarsSelected.length;

      //srujana used car changes
      this.oldCarsSelected = this.variantService.getOldCarIdsSelected();
      this.compareLengthOld = this.oldCarsSelected.length;

  }

  selectCarToCompare(event: any) {

    console.log("event.target " + event.target.value);
    if (this.carType == "New") {
      if (event.target.checked) {
        this.newCarsSelected.push(event.target.value);

      }
      else {
        let i: number = 0;
        this.newCarsSelected.forEach((item, index) => {
          if (item === event.target.value) {
            this.newCarsSelected.splice(index, 1);
          }
        });
      }
      //setting new Car ids selected in variant service
      this.variantService.setNewCarIdsSelected(this.newCarsSelected);
      console.log("Selected New Car to compare " + this.newCarsSelected);
      this.variantService.fetchNewVariantsById(this.newCarsSelected);
      this.compareLength = this.newCarsSelected.length;
    } else {
      if (event.target.checked) {
        this.oldCarsSelected.push(event.target.value);
        this.variantService.fetchAddOldCars(this.oldCarsSelected);
        console.log("Fetched Used Car to compare " + this.oldCarsSelected);
      }
      else {
        let i: number = 0;
        this.oldCarsSelected.forEach((item, index) => {
          if (item === event.target.value) {
            this.oldCarsSelected.splice(index, 1);
            console.log("Selected Used Car to compare " + this.oldCarsSelected);
            this.variantService.removeSelectedOldCar(item);
          }
        });

        // this.variantService.fetchAddOldCars(this.oldCarsSelected);
      }
      this.compareLengthOld = this.oldCarsSelected.length;
      // this.variantService.fetchAddOldCars(this.oldCarsSelected);
    }

    console.log("Compare length " + this.compareLength);
  }

  compareSelectedCars() {
    console.log("On click of compare");

    if(this.carType =="New" ){
      if(this.compareLength==0){
        this.compareCarsModal = true;
        return;
      }
      console.log("Compare New " + this.newCarsSelected);
      this.router.navigate(['compare', 'New']);
    }else{
      if(this.compareLengthOld==0){
        this.compareCarsModal = true;
        return;
      }
      console.log("Compare Used " + this.oldCarsSelected);
      this.router.navigate(['compare', 'Used']);
    }

  }

  compareDealerPrice() {
    console.log("Calling dealer compare page ");
  }

  setCarType(carType: any) {
    this.carType = carType;
  }

  getCarType() {
    return this.carType;
  }

  moveToDetails(id: any) {
    //alert(id);
    if (this.carType == "New") {
      this.router.navigate(['details', 'new', id]);
    } else {
      this.router.navigate(['details', 'old', id]);
    }
  }

  compareDealers(carName: any, cityName: any, variantName: any) {
    this.dealerService.setDetailsForDealerCompare(carName, cityName, variantName);
    this.router.navigate(['dealerCompare']);
  }

  onCheckIfSelected(id:any) :boolean{
    // console.log("onCheckIfSelected");
    // console.log(id);
    let selectCar:boolean = false;
    if(this.carType=="New"){
      for(let item of this.newCarsSelected){
        console.log("NewCars Id " + item);
        if (item == id) {
          return true;
        }
      }
    } else {
      for (let item of this.oldCarsSelected) {
       // console.log("OldCars Id " + item);
        if (item == id) {
          return true;
        }
      }
    }
    return selectCar;
  }

  OnClickCloseCompareCarsModal() {
    this.compareCarsModal = false;
  }

  onSearchKnowYourDealer(dealerId:any){
    this.router.navigate(['dealer', dealerId]);
  }

  onPageChange(event:any){
    console.log(event);
    this.currPage= event;
  }

  sortByPrice(event:any){
    if(event.target.value==='lth'){
      this.variantList.sort((a, b) => parseFloat(a.exShowroomPrice) - parseFloat(b.exShowroomPrice));
      this.variantList.sort((a, b) => parseFloat(a.dealerPrice) - parseFloat(b.dealerPrice));
    }
    if(event.target.value==='htl'){
      this.variantList.sort((a, b) => parseFloat(b.exShowroomPrice) - parseFloat(a.exShowroomPrice));
      this.variantList.sort((a, b) => parseFloat(b.dealerPrice) - parseFloat(a.dealerPrice));
    }
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
