import { Component, Input, OnInit } from '@angular/core';
import { car } from 'src/app/interfaces/car';
import { CardetailsResponse } from 'src/app/interfaces/cardetailsresponse';
import { CardetailsService } from 'src/app/services/cardetails/cardetails.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  @Input() notificationHeader: string = 'Latest Cars';
  @Input() cars: car[] = [];
  @Input() variantId: any = 1;

  constructor() {}

  ngOnInit(): void {
    //console.log('VARIANT ID::: ' + this.variantId);
    //console.log('CARS:: ', this.cars);
  }
}
