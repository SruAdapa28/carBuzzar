import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-car-features',
  templateUrl: './car-features.component.html',
  styleUrls: ['./car-features.component.css'],
})
export class CarFeaturesComponent implements OnInit {
  @Input() carType: any = 'New';

  basicInfoArray: string[] = [
    'Brand',
    'Manufacturing Year',
    'Ex Showroom Price',
    'Colour',
    'Body Type',
    'Transmission Type',
    'Seat Capacity',
    'Fuel Type',
    'Fuel Capacity',
    'Mileage',
    'Safety Rating',
    'Break Assist',
    'Air Bags',
    'Central Locking',
    'Power Door Locks',
    'Power Steering',
    'Power Window',
    'Max Power',
    'Max Torque',
    'Power Boot',
    'Abs',
    'Ground Clearance',
    'Height',
    'Width',
  ];
  imageLink = 'info';

  constructor() {}

  ngOnInit(): void {
    switch (this.carType) {
      case 'Used':
        this.basicInfoArray = [
          'Brand',
          'Year of Purchase',
          'Kilometers Driven',
          'Transmission Type',
          'Registration',
          'Owner Status',
          'Current Mileage',
          'Fuel Type',
          'Accident History',
          'Accident History Details',
          'Insurance Description',
          'Insurance Last Date',
          'Speakers',
          'Usb Compatibility',
          'Aux Compatibility',
          'Seat Upholsery Details',
          'Front Tyre Description',
          'Rear Tyre Description',
          'Cd Player',
          'Dealer Name',
          'Discount Available',
          'Discount Percentage',
          'Dealer Price',
        ];
        break;
      case 'Dealer':
        this.basicInfoArray = [
          'Discount Available',
          'Discount Percentage',
          'Free Accessories',
          'Free Accessories Details',
          'Offer Details',
          'Offer Valid Upto',
          'Waiting Period',
          'Buy Back Guarantee',
          'Buy Back Guarantee Details',
        ];
        break;
    }
  }
}
