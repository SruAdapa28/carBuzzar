import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { QueriesComponent } from '../queries/queries.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import {SearchDto} from 'src/app/services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  btn1Clicked = false;
  btn2Clicked = false;
  btn3Clicked = false;
  morefilterid = 'morefilterclose';
  brands : any[] = [];
  models : any[] = [];
  searchDto:SearchDto={
                    "airBags": 0,
                    "bodyType": [
                      ""
                    ],
                    "brandName": "",
                    "brandNames": [
                      ""
                    ],
                    "carName": "",
                    "carType": "",
                    "city": "",
                    "color": "",
                    "fuelType": [
                      ""
                    ],
                    "kilometersDriven": 0,
                    "maxPrice": 0,
                    "mileage": 0,
                    "minPrice": 0,
                    "ownerType": [],
                    "safetyRatings": 0,
                    "seatCapacity": [
                      0
                    ],
                    "transmissionType": [
                      ""
                    ]
                  };

  constructor(private searchService:SearchService, private queries:QueriesComponent,private brandService : BrandService
    ) {

     }


  //defining variables for search
  isNewCar : boolean =false;
  isOldCar : boolean =false;
  carType : string ="New";

  brandId : number =0;
  modelName : string="";
  price : number =0;

  seater: number[] = new Array();
  safetyRating : number=0;
  fuelType: string[] = new Array();
  brandName : string="";
  kmDriven : number=0;
  ownerType : string[] =[];
  transmissionType:string[] =[];
  minPrice :number =0;



  ngOnInit(): void {


    this.brandService.fetchBrand().subscribe(
      (response:any)=> {
        console.log(response.data);
        this.brands = response.data;
      }
    )
    console.log(this.brands);

    // this.onSearch();
    this.queries.setCarType(this.carType);
    this.queries.ngOnInit();
  }

  filter1Selected() {
    this.btn1Clicked = true;//!this.btn1Clicked;
    this.btn2Clicked=false;
    // this.btn2Clicked = !this.btn1Clicked;
    console.log('btn1 ' + this.btn1Clicked);
    console.log('btn2 ' + this.btn2Clicked);
  }

  filter2Selected() {
    this.btn2Clicked = true;//!this.btn2Clicked;
    this.btn1Clicked= false;
    // this.btn1Clicked = !this.btn2Clicked;
    console.log('btn1 ' + this.btn1Clicked);
    console.log('btn2 ' + this.btn2Clicked);
  }

  openMoreFilter() {
    this.morefilterid = 'morefilter';
    this.transmissionType=[];
    this.fuelType=[];
    this.brandId  =0;
    this.modelName ="";
    this.price  =0;
    this.seater = [];
    this.safetyRating =0;
    this.brandName ="";
    this.kmDriven =0;
    this.ownerType  =[];
    this.minPrice=0;
  }

  closeMoreFilter() {
    this.morefilterid = 'morefilterclose';
    this.transmissionType=[];
    this.fuelType=[];
    this.brandId  =0;
    this.modelName ="";
    this.price  =0;
    this.seater = [];
    this.safetyRating =0;
    this.brandName ="";
    this.kmDriven =0;
    this.ownerType  =[];
    this.minPrice=0;
  }

  isOldCarShown: boolean = false ; // hidden by default
  isNewCarShown: boolean = false ; // hidden by default


  toggleShow() {

    if(this.isNewCar){
      this.isNewCarShown = ! this.isNewCarShown;
    }
    else if(this.isOldCar){
      this.isOldCarShown = ! this.isOldCarShown;
    }
    else{
      alert("Select the Car Type ( New / Used cars)");
    }

}
onBrandeChange(event:any){
  console.log(event);
  //this.brandService.fetchModelsBasedOnBrands(event.target.value);
}

onSubmit(){
  console.log('submitted');
}



//methods to set the values for the search variables

setOldCarIndecator(){
if(this.isOldCar === false){
  this.isOldCar = true;
  this.isNewCarShown = false;
}
if(this.isNewCar === true){
  this.isNewCar = false;
  this.isOldCarShown = false;
}
this.setCarType("Used");
}

setNewCarIndecator(){
  if(this.isNewCar === false){
    this.isNewCar =true;
    this.isOldCarShown = false;
  }
  if(this.isOldCar === true){
    this.isOldCar =false;
    this.isNewCarShown = false;
  }
  this.setCarType("New");
}

//set the carTYpe : Old or New Car
setCarType(car : string){
  this.carType = car;
  this.transmissionType=[];
  this.fuelType=[];
  this.seater = [];
  this.safetyRating =0;
  this.kmDriven =0;
  this.ownerType  =[];

  console.log("Car = "+this.carType);
}

setBrandId(event : any){
  this.brandId = event.target.value;
  console.log("Brand = "+ this.brandId);
  this.brandService.fetchModelsBasedOnBrands(this.brandId).subscribe(
    (response:any)=>{
      this.models = response.data;
      console.log("Brand Name " );
    this.brandName = response.data[0].brand.name;

    console.log(response.data[0].brand.name);
    }
  )

  console.log("Models " + this.models);
}

setModelName(event : any){
  this.modelName = event.target.value;
  console.log("Model = "+ this.modelName);
}

setPrice(event : any){
  this.minPrice=0;
  this.price = event.target.value *100000;
  console.log("Price = "+ this.price);

  if(event.target.value == 20){
    this.price = 2000000;
    this.minPrice=1500000;
  }
  console.log("Price = "+ this.price);
  console.log("min Price = "+ this.minPrice);
}

//setting SeatCapicity

setSeatCapacity(event :any){
  if(event.target.checked){
    this.seater.push(event.target.value);
  }
  else{
    let i : number = 0;
    this.seater.forEach((item,index)=>{
      if(item === event.target.value){
        this.seater.splice(index,1);
      }
    });
  }
  console.log(this.seater);
}

setFuelType(event :any){
  if(event.target.checked){
    this.fuelType.push(event.target.value);
  }
  else{
    let i : number = 0;
    this.fuelType.forEach((item,index)=>{
      if(item === event.target.value){
        this.fuelType.splice(index,1);
      }
    });
  }
  console.log(this.fuelType);
}

setTransmissionType(event:any){
  if(event.target.checked){
    this.transmissionType.push(event.target.value);
  }
  else{
    let i : number = 0;
    this.transmissionType.forEach((item,index)=>{
      if(item === event.target.value){
        this.transmissionType.splice(index,1);
      }
    });
  }
  console.log(this.transmissionType);
}

setSafetyRatings(event : any){
  this.safetyRating = event.target.value;
  console.log("safetyRating = "+ this.safetyRating);
}

onSearch(){
  console.log("In OnSearch() " + this.carType);

  this.searchDto={
    "airBags": 0,
    "bodyType": [
    ],
    "brandName": this.brandName,
    "brandNames": [
    ],
    "carName": this.modelName,
    "carType": this.carType,
    "city": "",
    "color": "",
    "fuelType": this.fuelType,
    "kilometersDriven": 0,
    "maxPrice": this.price,
    "mileage": 0,
    "minPrice":this.minPrice,
    "ownerType": this.ownerType,
    "safetyRatings": this.safetyRating,
    "seatCapacity": this.seater,
    "transmissionType": this.transmissionType
    }
  // this.searchService.getSearchVariants();
  this.searchService.setSearchDto(this.searchDto);
  console.log(this.carType);
  this.queries.setCarType(this.carType);
  this.queries.ngOnInit();
}

//set KM Driven
setKmDriven(event: any){
  this.kmDriven = event.target.value;
  console.log("KM Driven = "+ this.kmDriven);
}

//set owner type
setOwnerType(event: any){
  this.ownerType = event.target.value;
  console.log("Owner Type "+ this.ownerType);
}


setBrandName(){

}

}
