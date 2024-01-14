import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CardetailsService } from 'src/app/services/cardetails/cardetails.service';
import { CityserviceService } from 'src/app/services/cityservice/cityservice.service';
import { DealerService } from 'src/app/services/dealer.service';

@Component({
  selector: 'app-dealer-compare',
  templateUrl: './dealer-compare.component.html',
  styleUrls: ['./dealer-compare.component.css'],
})
export class DealerCompareComponent implements OnInit {
  subHeading: string = 'Basic Information';
  basicInfoArray: string[] = [
    'Brand',
    'Manufacturing Year',
    'On Road Price',
    'Colour',
    'Body Type',
    'Seat Capacity',
  ];
  dealerNamesArray: string[] = ['Dealer1', 'Dealer2'];
  dealerCompareList: any[] = [];
  variant: any = {};
  showDealerPrice: boolean = false;
  dealerPrice: number = 0;
  allDetails: boolean = false;
  rtoCharges: any = [];
  priceBreakup: boolean = false;
  fastTagCharge: number = 0;
  imagesList: any = [];

  constructor(
    private dealerService: DealerService,
    private cityService: CityserviceService,
    private sanitizer: DomSanitizer,
    private carService: CardetailsService
  ) {}

  ngOnInit(): void {
    this.dealerService.getDealersToCompare().subscribe((response) => {
      this.dealerCompareList = response.data;
      console.log('dealer List To compare ');
      console.log(this.dealerCompareList);
    });

    this.dealerService.setDealerListToCompare(this.dealerCompareList);

    this.dealerService.getVariantByName().subscribe((response) => {
      this.variant = response.data;
      this.carService
        .getCarImages(this.variant.carName)
        .subscribe((response) => {
          let imageUrlList = response.data;
          this.imagesList = imageUrlList.map((image: any) => {
            console.log('image ', image);

            image = this.sanitizer.bypassSecurityTrustResourceUrl(
              'data:image/jpg;base64,' + image
            );
            return image;
          });

          console.log('Images', this.imagesList);
        });
      console.log('Variant retrieved ');
      console.log(this.variant);
    });
  }

  onShowDealerPrice(showroomPrice: any, dealerPercentage: any) {
    this.showDealerPrice = true;
    this.dealerPrice = (showroomPrice * (100 - dealerPercentage)) / 100;
    this.showDealerPrice = false;
  }

  closeAllDetails() {
    this.allDetails = false;
  }

  openAllDetails() {
    this.allDetails = true;
  }

  getRTO(exShowRoomPrice: number) {
    this.rtoCharges = this.cityService.getRtoCharges();
    let rto = 0;
    this.rtoCharges.forEach((rtoCharge: any) => {
      if (
        exShowRoomPrice < rtoCharge.maxPrice &&
        exShowRoomPrice >= rtoCharge.minPrice
      ) {
        rto = (exShowRoomPrice * rtoCharge.percentage) / 100;
      }
    });

    //console.log('OnRoadPrice... ' + onRoadPrice);
    return rto;
  }

  openPriceBreakup() {
    this.priceBreakup = true;
  }

  closePriceBreakup() {
    this.priceBreakup = false;
  }

  calculateOnRoadPrice(exShowroomPrice: any) {
    //console.log('EXShowRoomPrice', exShowroomPrice);

    this.rtoCharges = this.cityService.getRtoCharges();
    //console.log('RTO CHARGES>>> ' + this.rtoCharges);

    let onRoadPrice = 0;
    this.fastTagCharge = this.cityService.getFastTagCharge();

    this.rtoCharges.forEach((rtoCharge: any) => {
      if (
        exShowroomPrice < rtoCharge.maxPrice &&
        exShowroomPrice >= rtoCharge.minPrice
      ) {
        let rto = (exShowroomPrice * rtoCharge.percentage) / 100;
        //console.log('rto', rto);
        //this.rtoCharge = rto;
        onRoadPrice = exShowroomPrice + this.fastTagCharge + rto;
        // console.log(true);
        // console.log(fastTagCharge);
      }
    });

    //console.log('OnRoadPrice... ' + onRoadPrice);
    return onRoadPrice;
  }
}
