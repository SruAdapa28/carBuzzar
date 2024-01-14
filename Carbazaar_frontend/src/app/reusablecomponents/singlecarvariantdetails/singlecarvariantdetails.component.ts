import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CardetailsResponse } from 'src/app/interfaces/cardetailsresponse';
import { CardetailsService } from 'src/app/services/cardetails/cardetails.service';
import { CityserviceService } from 'src/app/services/cityservice/cityservice.service';
import { DealerService } from 'src/app/services/dealer.service';
import { VariantService } from 'src/app/services/variant.service';

@Component({
  selector: 'app-singlecarvariantdetails',
  templateUrl: './singlecarvariantdetails.component.html',
  styleUrls: ['./singlecarvariantdetails.component.css'],
})
export class SinglecarvariantdetailsComponent implements OnInit {
  @Input() variant: any = {};

  @Output() variantDetails = new EventEmitter<any>();
  newCarIdSelected:any[]=[];
  compareLength:number=0;
  allowedCarsToCompare:number=0;
  carChecked:boolean=false;

  cardetailsResponse: CardetailsResponse = {
    status: '',
    message: '',
    errorcode: '',
    data: undefined,
    httpStatusCode: 0,
  };

  rtoCharges: any = [];
  rtoCharge: any = 0;
  fastTagCharge: number = 0;
  priceBreakup: boolean = false;

  carService: CardetailsService;

  constructor(
    carService: CardetailsService,
    private cityService: CityserviceService,
    private variantService:VariantService,
    private dealerService:DealerService,
    private router:Router
  ) {
    this.carService = carService;
    console.log('VARIANT:::: ', this.variant);
  }

  ngOnInit(): void {
    //console.log('Variant:::');
    //console.log(this.variant);
    console.log('VARIANT1:::: ', this.variant);
    this.variant.fastTag = this.cityService.getFastTagCharge();
    this.variant.onRoadPrice = this.calculateOnRoadPrice(
      this.variant.exShowroomPrice
    );
    this.variant.rtoCharge = this.rtoCharge;
    console.log('VARIANT2:::: ', this.variant);

    this.allowedCarsToCompare = this.variantService.getAllowedCarsToCompare();
    this.newCarIdSelected= this.variantService.getNewCarIdsSelected();
  }

  showVariant(carName: string, variantName: string) {
    //alert(carName + ' ' + variantName);
    this.carService
      .getVariantDetails(carName, variantName)
      .subscribe((data) => {
        this.cardetailsResponse = data;
        //this.variantdetails = this.cardetailsResponse.data;
        //console.log('car variant data', this.cardetailsResponse.data);
        this.variantDetails.emit(this.cardetailsResponse.data);
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
        this.rtoCharge = (exShowroomPrice * rtoCharge.percentage) / 100;
        onRoadPrice = exShowroomPrice + fastTagCharge + this.rtoCharge;
        // console.log(true);
        // console.log(fastTagCharge);
      }
    });

    //console.log('OnRoadPrice... ' + onRoadPrice);
    return onRoadPrice;
  }

  openPriceBreakup() {
    this.priceBreakup = true;
  }

  closePriceBreakup() {
    this.priceBreakup = false;
  }

  selectCarToCompare(event:any){

    console.log("event.target " +event.target.value);
      if(event.target.checked){
        this.newCarIdSelected.push(event.target.value);
      }
      else{
        let i : number = 0;
        this.newCarIdSelected.forEach((item,index)=>{
          if(item === event.target.value){
            this.newCarIdSelected.splice(index,1);
          }
        });
      }
      console.log("Selected New Car to compare " + this.newCarIdSelected);
      this.variantService.setNewCarIdsSelected(this.newCarIdSelected);
      this.variantService.fetchNewVariantsById(this.newCarIdSelected);
      this.compareLength = this.newCarIdSelected.length;
    console.log("Compare length " + this.compareLength);
  }

  onCheckIfSelected(id:any) :boolean{
    console.log("onCheckIfSelected");
    console.log(id);
    let selectCar:boolean = false;
      for(let item of this.newCarIdSelected){
        console.log("NewCars Id " + item);
        if(item==id){
          console.log("Returning true");

          return true;
        }
      }

    return selectCar;
  }

  compareDealers(carName:any, cityName:any, variantName:any){
    this.dealerService.setDetailsForDealerCompare(carName,cityName,variantName);
    this.router.navigate(['dealerCompare']);
  }
}
