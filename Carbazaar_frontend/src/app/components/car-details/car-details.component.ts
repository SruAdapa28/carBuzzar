import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { car } from 'src/app/interfaces/car';
import { CardetailsResponse } from 'src/app/interfaces/cardetailsresponse';
import { oldCarDetails } from 'src/app/interfaces/oldcardetails';
import { SearchedDataElement } from 'src/app/interfaces/searchdataelement';
import { CardetailsService } from 'src/app/services/cardetails/cardetails.service';
import { CityserviceService } from 'src/app/services/cityservice/cityservice.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  cardetailsService: CardetailsService;
  cardetailsResponse: CardetailsResponse = {
    status: '',
    message: '',
    errorcode: '',
    data: undefined,
    httpStatusCode: 0,
  };
  carDetails: any = {};
  brandName: string = '';
  carname: string = '';
  variantDetails: any = {};
  imagesList:any =[];
  variants = [];
  newcar: boolean = true;
  oldcar: boolean = true;
  onRoadPrice: any = 0;
  rtoCharges: any = [];
  rtoCharge: any = 0;
  exShowRoomPrice: any = 0;
  fastTagCharge: any = 500;
  oldCarDetails: oldCarDetails = {
    oldCarName: '',
    oldCarVariant: '',
    history: '',
    ownerType: '',
    kilometerDriven: 0,
    fuelType: '',
    transmission: '',
    registration: '',
    insuranceLastDate: '',
    insuranceDescription: '',
    yearOfPurchase: '',
    cdPlayer: false,
    mp3Player: false,
    seatUpholseryDetails: '',
    frontTyreDesc: '',
    auxCompatibility: false,
    rearTyreDesc: '',
    usbCompatibility: false,
    speakers: 0
  };
  variantName: string = '';
  variantId: any;
  transmissionType: string = '';
  mileage: string = '';
  seatCapacity: string = '';
  route: ActivatedRoute;
  url: string = '';
  alldetails: boolean = false;
  similarCarsResponse: any;
  similarCars: car[] = [];
  id: any;
  type: any = 'new';
  searchDataResponse: any = [];
  searchDataRequest: any = [];
  found: boolean = false;
  router: any;
  priceBreakup: boolean = false;
  cityName: string = '';

  constructor(
    cardetailsService: CardetailsService,
    route: ActivatedRoute,
    router: Router,
    private cityService: CityserviceService,
    private sanitizer: DomSanitizer
  ) {
    this.cardetailsService = cardetailsService;
    this.route = route;
    this.router = router;
    console.log('Constructor...');
  }

  ngOnInit(): void {
    //this.id = this.route.snapshot.params['id'];
    //this.type = this.route.snapshot.params['type'];
    this.cityService.city$.subscribe((message) => {
      //alert('City ' + message);
      this.cityName = message;
      this.reloadPage();
    });

    this.cityName = this.cityService.getCity();

    this.initialize();
  }

  initialize() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.type = params['type'];
    });
    console.log('id::: ' + this.id);
    console.log('type::: ' + this.type);

    if (this.type === 'old') {
      //this.url = 'http://localhost:8083/oldcar/' + this.id;
      this.url =
        'https://dealer-service-urtjok3rza-wl.a.run.app/oldcar/' + this.id;
      this.newcar = false;
    } else {
      //this.url = 'http://localhost:8291/cars/' + this.id + '?city=Bhubaneswar';

      //srujana changes -- to be added
      this.url =
        'https://car-service-urtjok3rza-wl.a.run.app/cars/' +
        this.id +
        '?city=' +
        'Bhubaneshwar';
      this.newcar = true;
    }

    // to be changed...

    //   if (type === 'old') {
    //   this.url = 'https://dealer-service-urtjok3rza-wl.a.run.app/oldcar/' + id;
    //   this.newcar = false;
    // } else {
    //   this.url = 'https://car-service-urtjok3rza-wl.a.run.app/cars/' + id;
    //   this.newcar = true;
    // }

    console.log('Car Details Url... ' + this.url);

    this.cardetailsService.getCarDetails(this.url).subscribe((data) => {
      // console.log(data);
      this.cardetailsResponse = data;
      console.log('car details response ', this.cardetailsResponse.data);
      this.initiateValues(this.cardetailsResponse.data);
    });
  }

  initiateValues(carDetails: any) {
    this.carDetails = carDetails;
    this.imagesList = this.carDetails.imageUrlList.map((image:any) => {
      console.log("image " , image);

      image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + image);
      return image;
    });

    console.log("Images", this.imagesList);

    // console.log(this.carDetails.kilometersDriven > 0);
    if (this.carDetails.kilometersDriven > 0) {
      //old car
      //this.newcar = false;
      this.carname = this.carDetails.carName;
      this.brandName = this.carDetails.brand.name;
      this.onRoadPrice = this.carDetails.dealerPrice;
      this.variantName = this.carDetails.variantName;
      this.transmissionType = this.carDetails.transmissionType;
      this.mileage = this.carDetails.currentMileage;
      console.log(
        'old car name',
        this.carname,
        'variant name',
        this.variantName
      );
      this.oldCarDetails = {
        oldCarName: this.carname,
        oldCarVariant: this.variantName,
        history: this.carDetails.accidentHistory,
        insuranceLastDate: this.carDetails.insuranceLastDate,
        insuranceDescription: this.carDetails.insuranceDescription,
        kilometerDriven: this.carDetails.kilometersDriven,
        ownerType: this.carDetails.ownerStatus,
        registration: this.carDetails.registration,
        transmission: this.carDetails.transmissionType,
        yearOfPurchase: this.carDetails.yearOfPurchase,
        fuelType: this.carDetails.fuelType,
        cdPlayer: this.carDetails.cdPlayer,
        mp3Player: this.carDetails.mp3Playback,
        seatUpholseryDetails: this.carDetails.seatUpholseryDetails,
        frontTyreDesc: this.carDetails.frontTyreDesc,
        auxCompatibility: this.carDetails.auxCompatibility,
        rearTyreDesc: this.carDetails.rearTyreDesc,
        usbCompatibility: this.carDetails.rearTyreDesc,
        speakers: this.carDetails.speakers,
      };
      console.log('Old Car Details... ', this.oldCarDetails);

      if (!this.oldCarDetails.history) {
        this.oldCarDetails.history = 'Non - Accidental';
      }
      console.log();
    } else {
      //new car
      //this.newcar = true;
      this.carname = this.carDetails.name;
      this.brandName = this.carDetails.brand.name;
      this.variantDetails = this.carDetails.variants[0];
      this.variantId = this.variantDetails.id;
      this.variantName = this.variantDetails.variantName;
      this.variants = this.carDetails.variants;
      console.log('VARIANTS::: ', this.variants);

      this.exShowRoomPrice = this.variantDetails.exShowroomPrice;
      //console.log('EXSHOWROOM', this.exShowRoomPrice);
      this.rtoCharge = this.getRTO(this.exShowRoomPrice);
      this.fastTagCharge = this.cityService.getFastTagCharge();
      //this.onRoadPrice = this.variantDetails.exShowroomPrice / 100000;
      this.onRoadPrice = this.calculateOnRoadPrice(this.exShowRoomPrice);
      //console.log('ONROAD', this.onRoadPrice);

      this.mileage = this.variantDetails.mileage;
      this.seatCapacity = this.variantDetails.seatCapacity;
      this.transmissionType = this.variantDetails.transmissionType;
      //console.log('variant id', this.variantId);
      this.cardetailsService
        .getSimilarCars(this.variantId)
        .subscribe((data) => {
          this.cardetailsResponse = data;
          // this.similarCarsResponse = this.cardetailsResponse.data;
          // console.log('Similar Cars Response... ', this.similarCarsResponse);
          this.initializeCars(this.cardetailsResponse.data);
        });
    }
    // console.log(this.variants);
  }

  closeAllDetails() {
    this.alldetails = false;
  }

  openAllDetails() {
    this.alldetails = true;
  }

  fetchVariantDetails(data: any) {
    //console.log('Car Details Service Event.. ', data);
    this.variantDetails = data;
    this.variantName = this.variantDetails.variantName;
    this.variants = this.carDetails.variants;
    this.exShowRoomPrice = this.variantDetails.exShowroomPrice;
    //console.log('EXSHOWROOM', this.exShowRoomPrice);

    this.fastTagCharge = this.cityService.getFastTagCharge();

    this.rtoCharge = this.exShowRoomPrice;
    this.onRoadPrice = this.calculateOnRoadPrice(this.exShowRoomPrice);

    //this.onRoadPrice = this.variantDetails.exShowroomPrice / 100000;
    this.mileage = this.variantDetails.mileage;
    this.seatCapacity = this.variantDetails.seatCapacity;
    this.transmissionType = this.variantDetails.transmissionType;
    this.variantId = this.variantDetails.id;
    //console.log('variant id', this.variantId);
    this.cardetailsService.getSimilarCars(this.variantId).subscribe((data) => {
      this.cardetailsResponse = data;
      this.similarCarsResponse = this.cardetailsResponse.data;
      //  console.log('Similar Cars Response... ', this.similarCarsResponse);
      this.initializeCars(this.similarCarsResponse);
    });
  }

  initializeCars(response: any) {
    //latest car recommendation
    this.similarCarsResponse = [];
    response.forEach((similarCar: any) => {
      let exShowRoomPrice = similarCar.variants[0].exShowroomPrice;
      //  console.log('EXSHOW..', exShowRoomPrice);

      let car = {
        id: similarCar.id,
        carName: similarCar.name,
        brandName: similarCar.brand.name,
        //onRoadPrice: similarCar.variants[0].exShowroomPrice,
        onRoadPrice: this.calculateOnRoadPrice(exShowRoomPrice),
        engine: similarCar.variants[0].engine,
        mileage: similarCar.variants[0].mileage,
        transmission: similarCar.variants[0].transmissionType,
        image: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + similarCar.imageUrlList[0]),
      };
      this.similarCarsResponse.push(car);
    });

    this.similarCars = this.similarCarsResponse;
    this.similarCars.sort(() => Math.random() - 0.5);
    //console.log('Similar Cars... ', this.similarCars);
  }

  moveToDetails(id: any, carName: string) {
    //alert(id);
    //console.log('similar cars Before ', this.similarCars);

    this.searchDataResponse = JSON.parse(localStorage.getItem('searchData')!);
    //console.log('Search Data Response... ', this.searchDataResponse);

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

    //this.url = 'http://localhost:8291/cars/' + id + '?city=Bhubaneswar';
    this.url =
      'https://car-service-urtjok3rza-wl.a.run.app/cars/' +
      id +
      '?city=Bhubaneswar';
    this.cardetailsService.getCarDetails(this.url).subscribe((data) => {
      // console.log(data);
      this.cardetailsResponse = data;
      console.log('car details response ', this.cardetailsResponse.data);
      this.initiateValues(this.cardetailsResponse.data);
    });

    //console.log('similar cars After ', this.similarCars);

    //this.router.navigate(['details', 'new', id]);
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

  reloadPage() {
    this.initialize();
  }
}
