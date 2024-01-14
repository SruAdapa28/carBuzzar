import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityserviceService } from 'src/app/services/cityservice/cityservice.service';
import { DealerService } from 'src/app/services/dealer.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-all-dealers',
  templateUrl: './all-dealers.component.html',
  styleUrls: ['./all-dealers.component.css'],
})
export class AllDealersComponent implements OnInit {
  constructor(
    private dealerService: DealerService,
    private router: Router,
    private cityService: CityserviceService
  ) {}

  dealerList: any[] = [];
  filteredDealers: any[] = [];
  delaerShowWithoutFilter: boolean = true;
  delaerShowWithFilter: boolean = false;

  ngOnInit(): void {
    this.cityService.city$.subscribe((message) => {
      //alert('City ' + message);
      this.reloadPage();
    });
    //this.filteredDealers = [];
    this.filteredDealers.splice(0, this.filteredDealers.length);
    this.dealerService.getAllDealers().subscribe((response: any) => {
      this.dealerList = response.data;
      console.log('Al dealers = ' + this.dealerList);
    });
    this.dealerList.forEach((item, index) => {
      this.filteredDealers.push(item);
    });
    console.log('FIltered dealers = ' + this.filteredDealers);
  }
  dealerid: number = 0;
  knowMore(id: any) {
    console.log(id);
    this.router.navigate(['dealer', id]);
  }

  filterCarDealer(event: any) {
    this.delaerShowWithoutFilter = false;
    this.delaerShowWithFilter = true;
    console.log(this.delaerShowWithFilter);
    if (event.target.value === 'ALL') {
      this.filteredDealers.splice(0, this.filteredDealers.length);
      this.dealerList.forEach((item, index) => {
        this.filteredDealers.push(item);
      });
    }
    if (event.target.value === 'OLD') {
      this.filteredDealers.splice(0, this.filteredDealers.length);
      this.dealerList.forEach((item, index) => {
        if (item.carType == 'OLD' || item.carType == 'BOTH') {
          this.filteredDealers.push(item);
        }
      });
    }
    if (event.target.value === 'NEW') {
      console.log('In New');
      this.filteredDealers.splice(0, this.filteredDealers.length);
      this.dealerList.forEach((item, index) => {
        if (item.carType == 'NEW' || item.carType == 'BOTH') {
          this.filteredDealers.push(item);
        }
      });
    }
  }
  desc: string = '';
  dealerDescc(carType: any, brandName: any) {
    if (carType === 'NEW') {
      this.desc = brandName + ' Showroom';
    }
    if (carType === 'OLD') {
      this.desc = 'All Brands used Car Dealer';
    }
    if (carType === 'BOTH') {
      this.desc = 'New/Used Car Dealer for ' + brandName;
    }
    return this.desc;
  }

  reloadPage() {
    //this.filteredDealers = [];
    this.filteredDealers.splice(0, this.filteredDealers.length);
    this.dealerService.getAllDealers().subscribe((response: any) => {
      this.dealerList = response.data;
      console.log('Al dealers = ' + this.dealerList);
    });
    this.dealerList.forEach((item: any, index: any) => {
      this.filteredDealers.push(item);
    });
    window.location.reload();
  }
}
