import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CityserviceService } from 'src/app/services/cityservice/cityservice.service';
import { VariantService } from 'src/app/services/variant.service';

@Component({
  selector: 'app-newcarbody',
  templateUrl: './newcarbody.component.html',
  styleUrls: ['./newcarbody.component.css'],
})
export class NewcarbodyComponent implements OnInit {
  @Input() variants = [];
  @Input() carName: string = '';
  @Input() brandName: string = '';
  @Output() carVariantDetailsEmitter = new EventEmitter<any>();
  p: number = 1;
  rtoCharges: any = [];
  rtoCharge: any = 0;
  fastTagCharge: number = 500;
  compareCarsModal:boolean= false;

  constructor(private cityService: CityserviceService, private router: Router, private variantService:VariantService) {
    console.log('const variants1: ', this.variants);
  }

  ngOnInit(): void {
    console.log('variants: ', this.variants);
    // this.variantService.setNewCarIdsSelected([]);
    // this.variants.map((variant: any) => {
    //   variant.fastTag = this.cityService.getFastTagCharge();
    //   variant.onRoadPrice = this.calculateOnRoadPrice(variant.exShowroomPrice);
    //   variant.rtoCharge = this.rtoCharge;
    // });
    // console.log('const variants: ', this.variants);
    //console.log('carname: ' + this.carName);
  }

  fetchVariantDetails(data: any) {
    //console.log('Event.. ', data);
    this.carVariantDetailsEmitter.emit(data);
  }

  calculateOnRoadPrice(exShowroomPrice: any) {
    //console.log('EXShowRoomPrice', exShowroomPrice);

    this.rtoCharges = this.cityService.getRtoCharges();
    //console.log('RTO CHARGES>>> ' + this.rtoCharges);

    let onRoadPrice = 0;
    //let fastTagCharge = this.cityService.getFastTagCharge();

    this.rtoCharges.forEach((rtoCharge: any) => {
      if (
        exShowroomPrice < rtoCharge.maxPrice &&
        exShowroomPrice >= rtoCharge.minPrice
      ) {
        this.rtoCharge = (exShowroomPrice * rtoCharge.percentage) / 100;
        onRoadPrice = exShowroomPrice + this.fastTagCharge + this.rtoCharge;
        // console.log(true);
        // console.log(fastTagCharge);
      }
    });

    //console.log('OnRoadPrice... ' + onRoadPrice);
    return onRoadPrice;
  }

  compareSelectedCars(){
    console.log("On click of compare");

    if(this.variantService.getNewCarIdsSelected().length==0){
      this.compareCarsModal = true;
      return;
    }
      this.router.navigate(['compare', 'New']);
  }

  OnClickCloseCompareCarsModal(){
    this.compareCarsModal = false;
  }
}
