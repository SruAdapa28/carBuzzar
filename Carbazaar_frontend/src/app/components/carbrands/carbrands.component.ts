import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchDto, SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-carbrands',
  templateUrl: './carbrands.component.html',
  styleUrls: ['./carbrands.component.css']
})
export class CarbrandsComponent implements OnInit {

  private brand:string="";
  searchDto: SearchDto = {
    airBags: 0,
    bodyType: [],
    brandName: '',
    brandNames: [''],
    carName: 'New',
    carType: '',
    city: '',
    color: '',
    fuelType: [],
    kilometersDriven: 0,
    maxPrice: 0,
    mileage: 0,
    minPrice: 0,
    ownerType: [''],
    safetyRatings: 0,
    seatCapacity: [0],
    transmissionType: [],
  };

  constructor(private searchService:SearchService, private router:Router) { }

  ngOnInit(): void {
  }
  onClickBrand(event:any) {
    console.log('In Search home ');
    this.brand=event;
    console.log("event=",event);
    this.searchDto = {
      airBags: 0,
      bodyType: [],
      brandName: this.brand,
      brandNames: [],
      carName: '',
      carType: 'New',
      city: '',
      color: '',
      fuelType: [],
      kilometersDriven: 0,
      maxPrice: 0,
      mileage: 0,
      minPrice: 0,
      ownerType: [],
      safetyRatings: 0,
      seatCapacity: [],
      transmissionType: [],
    };
    console.log("searchDTO= ", this.searchDto)
    this.searchService.setSearchDto(this.searchDto);
    this.router.navigate(['carSuggestions']);
  }
}
