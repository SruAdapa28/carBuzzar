import { Component, Input, OnInit } from '@angular/core';
import { CardetailsResponse } from 'src/app/interfaces/cardetailsresponse';
import { oldCarDetails } from 'src/app/interfaces/oldcardetails';
import { CardetailsService } from 'src/app/services/cardetails/cardetails.service';

@Component({
  selector: 'app-oldcarbody',
  templateUrl: './oldcarbody.component.html',
  styleUrls: ['./oldcarbody.component.css'],
})
export class OldcarbodyComponent implements OnInit {
  @Input() oldCarDetails: oldCarDetails = {
    oldCarName: '',
    oldCarVariant: '',
    history: '',
    ownerType: '',
    kilometerDriven: undefined,
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
    speakers: undefined,
  };
  @Input() carName: string = '';
  @Input() variantName: string = '';
  showModal: boolean = false;

  carDetails: CardetailsService;
  url: string = '';
  cardetailsResponse: CardetailsResponse = {
    status: '',
    message: '',
    errorcode: '',
    data: {},
    httpStatusCode: 0,
  };
  specifications: any = {
    fuelType: '',
    transmissionType: '',
    maxPower: '',
    mileage: 0,
    seatCapacity: 0,
    fuelCapacity: 0,
    maxTorque: '',
    safetyRating: 0,
  };

  features: any = {
    centralLocking: true,
    breakAssist: true,
    powerBoot: true,
    powerDoorLocks: true,
    powerSteering: true,
    powerWindow: '',
    cdPlayer: true,
    mp3Player: true,
  };

  overview: boolean = true;
  feature: boolean = false;
  specification: boolean = false;

  constructor(carDetails: CardetailsService) {
    this.carDetails = carDetails;
  }

  ngOnInit(): void {
    // this.url =
    //   'http://localhost:8291/cars/variant?carName=' +
    //   this.oldCarDetails.oldCarName +
    //   '&variantName=' +
    //   this.oldCarDetails.oldCarVariant;
    this.url =
      'https://car-service-urtjok3rza-wl.a.run.app/cars/variant?carName=' +
      this.carName +
      '&variantName=' +
      this.variantName;
    this.carDetails.getCarVariantDetails(this.url).subscribe((data) => {
      //console.log('old car response details variant... ', data);
      this.cardetailsResponse = data;
      console.log('variant details... ', this.cardetailsResponse.data);
      this.setSpecifications(this.cardetailsResponse.data);
      this.setFeatures(this.cardetailsResponse.data);
    });
  }

  setSpecifications(data: any) {
    //console.log('old car details2 ...', this.oldCarDetails);
    this.specifications = {
      fuelType: data.fuelType,
      transmissionType: data.transmissionType,
      maxPower: data.maxPower,
      mileage: data.mileage,
      seatCapacity: data.seatCapacity,
      fuelCapacity: data.fuelCapacity,
      maxTorque: data.maxTorque,
      safetyRating: data.safetyRating,
    };
  }

  setFeatures(data: any) {
    this.features = {
      centralLocking: data.centralLocking,
      breakAssist: data.breakAssist,
      powerBoot: data.powerBoot,
      powerDoorLocks: data.powerDoorLocks,
      powerSteering: data.powerSteering,
      powerWindow: data.powerWindow,
      cdPlayer: this.oldCarDetails.cdPlayer,
      mp3Player: this.oldCarDetails.mp3Player,
    };
  }

  showOverview() {
    this.overview = true;
    this.feature = false;
    this.specification = false;
  }

  showFeatures() {
    this.overview = false;
    this.feature = true;
    this.specification = false;
  }

  showSpecifications() {
    this.overview = false;
    this.feature = false;
    this.specification = true;
  }

  closeModal() {
    this.showModal = false;
  }

  openModal() {
    this.showModal = true;
  }
}
