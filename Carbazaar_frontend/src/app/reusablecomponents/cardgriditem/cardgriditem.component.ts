import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CarCompareComponent } from 'src/app/components/car-compare/car-compare.component';
import { car } from 'src/app/interfaces/car';
import { SearchedDataElement } from 'src/app/interfaces/searchdataelement';
import { VariantService } from 'src/app/services/variant.service';
import { CardetailsService } from 'src/app/services/cardetails/cardetails.service';
import { CityserviceService } from 'src/app/services/cityservice/cityservice.service';
import { rtocharge } from 'src/app/interfaces/rtocharge';

@Component({
  selector: 'app-cardgriditem',
  templateUrl: './cardgriditem.component.html',
  styleUrls: ['./cardgriditem.component.css'],
})
export class CardgriditemComponent implements OnInit {
  @Input() car: car = {
    carName: '',
    brandName: '',
    onRoadPrice: undefined,
    engine: undefined,
    mileage: undefined,
    transmission: '',
    image: undefined,
    id: undefined,
  };
  router: Router;
  searchDataResponse: any = [];
  searchDataRequest: any = [];
  found: boolean = false;

  @Input() carVariant: any;
  @Input() carType: any;
  @Input() closeIncluded: boolean = false;
  rtoCharges: rtocharge[] = [];

  constructor(
    router: Router,
    private variantService: VariantService,
    private sanitizer: DomSanitizer,
    private carService: CardetailsService,
    private cityService: CityserviceService
  ) {
    this.router = router;
    console.log('grid constructor');
  }

  ngOnInit(): void {
    console.log('CardGrid onInit ');

    console.log(this.carType);
    this.car.image = this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpg;base64,' + this.car.image
    );

    if (this.carType == 'New') {
      console.log('CAR VARIANT ', this.carVariant);

      //let image='';
      let imageUrlList1: any = [];
      this.carService
        .getCarImages(this.carVariant.carName)
        .subscribe((response: { data: any }) => {
          imageUrlList1 = response.data;
          console.log('IMAGE URL RESPONSE ', imageUrlList1);
          this.car = {
            carName: this.carVariant.carName,
            brandName: this.carVariant.carBrand.name,
            onRoadPrice: this.calculateOnRoadPrice(
              this.carVariant.exShowroomPrice
            ),
            engine: this.carVariant.engine,
            mileage: this.carVariant.mileage,
            transmission: this.carVariant.transmissionType,
            image: this.sanitizer.bypassSecurityTrustResourceUrl(
              'data:image/jpg;base64,' + imageUrlList1[0]
            ),
            //image: this.carVariant.imageUrlList[0],
            id: this.carVariant.carId,
          };
        });
      //console.log('IMAGE URL LIST1 ', imageUrlList1);
    } else if (this.carType == 'Used') {
      console.log('CAR VARIANT ', this.carVariant);
      this.car = {
        carName: this.carVariant.carName,
        brandName: this.carVariant.brand.name,
        onRoadPrice: this.carVariant.dealerPrice,
        engine: this.carVariant.engine,
        mileage: this.carVariant.currentMileage,
        transmission: this.carVariant.transmissionType,
        image: this.sanitizer.bypassSecurityTrustResourceUrl(
          'data:image/jpg;base64,' + this.carVariant.imageUrlList[0]
        ),
        //image: this.carVariant.imageUrlList[0],
        id: this.carVariant.id,
      };

      console.log('Old Car :');
      console.log(this.car);
    }
  }

  moveToDetails(id: any) {
    //alert(id);
    //console.log('this car name is ' + this.car.carName);
    this.searchDataResponse = JSON.parse(localStorage.getItem('searchData')!);
    //console.log('Search Data Response... ', this.searchDataResponse);

    if (this.searchDataResponse !== null) {
      this.searchDataResponse.map((data: SearchedDataElement) => {
        if (data.key === this.car.carName) {
          this.found = true;
          data.count = data.count + 1;
        }
        //this.searchDataRequest.push(data);
      });

      // console.log(
      //   'Search Data Request... ',
      //   this.searchDataResponse,
      //   ' flag ',
      //   this.found
      // );

      if (!this.found) {
        this.searchDataResponse.push({ key: this.car.carName, count: 1 });
      }

      localStorage.setItem(
        'searchData',
        JSON.stringify(this.searchDataResponse)
      );
    } else {
      //console.log('else bock...');

      this.searchDataRequest.push({ key: this.car.carName, count: 1 });
      localStorage.setItem(
        'searchData',
        JSON.stringify(this.searchDataRequest)
      );
    }

    this.router.navigate(['./details', 'new', id]);
    //this.router.navigate(['/home']);
  }

  onCloseVariant() {
    console.log(
      'Close variant ' + this.carVariant.id + this.carVariant.carName
    );
    if (this.carType == 'New') {
      this.variantService.removeSelectedVariant(this.carVariant.id);
    } else {
      this.variantService.removeSelectedOldCar(this.car.id);
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
        onRoadPrice =
          exShowroomPrice +
          fastTagCharge +
          (exShowroomPrice * rtoCharge.percentage) / 100;
        // console.log(true);
        // console.log(fastTagCharge);
      }
    });

    return onRoadPrice;
  }
}
