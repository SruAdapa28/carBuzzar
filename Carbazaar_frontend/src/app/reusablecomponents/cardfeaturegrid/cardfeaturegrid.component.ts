import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardfeaturegrid',
  templateUrl: './cardfeaturegrid.component.html',
  styleUrls: ['./cardfeaturegrid.component.css']
})
export class CardfeaturegridComponent implements OnInit {

  @Input() serialNo:number=0;
  @Input() headerRequired:boolean = false;
  carArray:String[] = ["Safety","Hello","10.44 Lakh","Red","MICRO"];
  constructor() { }

  ngOnInit(): void {
    switch(this.serialNo){
      case 1: this.carArray = ["Suzuki","2017","10.44 Lakh","Red","MICRO","5"];break;
      case 2: this.carArray = ["81","Yes","4","Available","Present"];break;
      case 3: this.carArray = ["Petrol", "35.5 Litres", "16.5 Kmpl","81.80bhp@6000rpm","113Nm@4200rpm"]; break;
      case 4: this.carArray = ["19.5 Kmpl", "30000 kms","None","2 Services free within 1 year","Nov 2021","" ];
    }

  }

}
