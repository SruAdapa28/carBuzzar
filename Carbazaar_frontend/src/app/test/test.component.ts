import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  subHeading:string= "Basic Information";
  basicInfoArray:string[] = ["Brand","Manufacturing Year","On Road Price","Colour","Body Type","Seat Capacity"];
  dealerNamesArray:string[] =["Dealer1","Dealer2"];

  constructor() { }

  ngOnInit(): void {
  }

}
