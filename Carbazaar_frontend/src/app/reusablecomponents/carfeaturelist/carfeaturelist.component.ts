import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carfeaturelist',
  templateUrl: './carfeaturelist.component.html',
  styleUrls: ['./carfeaturelist.component.css']
})
export class CarfeaturelistComponent implements OnInit {

  @Input() headerRequired = true;
  @Input() carArrayBasic:String[] =["Safety","Hello","10.44 Lakh","Red","MICRO","5","81","Yes","4","Available","Present","Petrol", "35.5 Litres", "16.5 Kmpl","81.80bhp@6000rpm","113Nm@4200rpm","19.5 Kmpl", "30000 kms","None","2 Services free within 1 year","Nov 2021",""];
  carName :String = "";
  @Input() carType="New";
  @Input() variant:any={};
  showDealerPrice:boolean=false;
  @Input() carInfo:any={};
  dealerPrice:any;

  constructor() { }

  ngOnInit(): void {
    switch(this.carType){
    case("New"):
    this.carName = this.variant.carBrand.name + " " + this.variant.carName + " " + this.variant.variantName;
    console.log(this.variant.name);
    this.carArrayBasic =[this.variant.carBrand.name ,
                         this.variant.manufacturingYear,
                         this.variant.exShowroomPrice/100000 + " Lakhs",
                         this.variant.color[0],
                         this.variant.bodyType,
                         this.variant.transmissionType,
                         this.variant.seatCapacity,
                         this.variant.fuelType,
                         this.variant.fuelCapacity + " Litres",
                         this.variant.mileage + " Kmpl",
                         this.variant.safetyRating,
                         this.variant.breakAssist,
                         this.variant.airbags,
                         this.variant.centralLocking,
                         this.variant.powerDoorLocks,
                         this.variant.powerSteering,
                         this.variant.powerWindow,

                         this.variant.maxPower,
                         this.variant.maxTorque,
                         this.variant.powerBoot,
                         this.variant.abs,
                         this.variant.groundClearance,
                         this.variant.height,
                         this.variant.width,
                         ];
          break;
      case("Used"):
      this.carName = this.variant.brand.name + " " + this.variant.carName + " " + this.variant.variantName;
      console.log("Used " +this.variant.carName);
      this.carArrayBasic =[this.variant.brand.name ,
                           this.variant.yearOfPurchase,
                           this.variant.kilometersDriven + " Km",
                           this.variant.transmissionType,
                           this.variant.registration,
                           this.variant.ownerStatus,
                           this.variant.currentMileage + " Litres",
                           this.variant.fuelType ,
                           this.variant.accidentHistory,
                           this.variant.accidentHistoryDetails,
                           this.variant.insuranceDescription,
                           this.variant.insuranceLastDate,
                           this.variant.speakers,
                           this.variant.usbCompatibility,
                           this.variant.auxCompatibility,

                           this.variant.seatUpholseryDetails,
                           this.variant.frontTyreDesc,
                           this.variant.rearTyreDesc,
                           this.variant.cdPlayer,
                           this.variant.dealerName,
                           this.variant.discountAvailable,
                           this.variant.discountPercentage,
                           this.variant.dealerPrice/100000 + " Lakhs"

                           ];
                           break;
      case("Dealer"):
      this.carName = this.variant.dealerName;
      console.log("Used " +this.variant.dealerName);
      this.carArrayBasic =[this.variant.discountAvailable ,
                          this.variant.discountPercentage,
                          this.variant.freeAccessories ,
                          this.variant.freeAccessoriesDetails,
                          this.variant.offerDetails,
                          this.variant.offerValidUpto,
                          this.variant.watingPeriod ,
                          this.variant.buybackGurantee ,
                          this.variant.buybackGuranteeDetails
                          ];
      }

  }

  onShowDealerPrice(){
    this.showDealerPrice= true;
    this.dealerPrice = (this.carInfo.exShowroomPrice * (100-this.variant.discountPercentage))/10000000;

  }

}
