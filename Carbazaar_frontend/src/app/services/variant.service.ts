import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { checkedNewCars } from '../interfaces/checkedNewCars';
import { CardetailsResponse } from '../interfaces/cardetailsresponse';
import { newCarVariant } from '../interfaces/newCarVariant';

@Injectable({
  providedIn: 'root',
})
export class VariantService {
  private variants: any[] = [];
  variantChanged = new Subject<void>();
  newCarsSelected: newCarVariant[] = [];
  oldCarsSelected: any[] = [];
  oldCarIdsSelected:any[]=[];
  carType: any;
  allowedCarsToCompare: number = 4;
  carNamesTitle:any="";
  newCarIdsSelected:any[]=[];
  newDealerCarIdsSelected :any[]=[];
  carIdsSelected:checkedNewCars[]=[];

  getOldCarIdsSelected(){
    return this.oldCarIdsSelected;
  }

  setOldCarIdsSelected(oldCarIdsSelected:any[]){
    this.oldCarIdsSelected = oldCarIdsSelected;
  }


  getNewCarIdsSelected(){
    return this.newCarIdsSelected;
  }

  setNewCarIdsSelected(newCarIdsSelected:any[]){
    this.newCarIdsSelected = newCarIdsSelected;
  }

  public getAllowedCarsToCompare() {
    return this.allowedCarsToCompare;
  }

  public getAllVariants() {
    return this.variants;
  }

  public getSelectedVariants(carType: any) {
    if (carType == 'New') {
      return this.newCarsSelected;
    } else {
      return this.oldCarsSelected;
    }
  }

  getCarNamesTitle(){
    return this.carNamesTitle;
  }

  constructor(private http: HttpClient) {
    // this.fetchVariants();
  }

  public fetchNewVariantsById(selectedVariantsToCompare: any[]) {
    this.carType = 'New';

    console.log('New selectedVariantsToCompare ' + selectedVariantsToCompare);
    this.http
      .post<any>(
        'https://car-service-urtjok3rza-wl.a.run.app/variant/compare',
        selectedVariantsToCompare
      )
      .subscribe((response: any) => {
        this.newCarsSelected = response.data;
        console.log('fetchVariantById New');
        console.log(this.newCarsSelected);
      });

  }

  public fetchAddOldCars(fetchedOldCarsIds: number[]) {
    this.carType = 'Used';
    console.log('fetchedOldCarsIds ' + fetchedOldCarsIds);
    this.oldCarsSelected = [];
    this.setOldCarIdsSelected(fetchedOldCarsIds);
    fetchedOldCarsIds.forEach((item) => {
      console.log('item ' + item);
      let resultUrl =
        'https://dealer-service-urtjok3rza-wl.a.run.app/oldcar/' + item;
      this.http.get<any>(resultUrl).subscribe((response: any) => {
        this.oldCarsSelected.push(response.data);
        console.log('fetchedOldCars Used');
        console.log(this.oldCarsSelected);

      });
    });
   // this.fetchCarCompareTitle();
  }

  public removeSelectedOldCar(id: any) {
    console.log('Item to be removed ' + id);
    this.oldCarsSelected.forEach((item, index) => {
      console.log(item);
      if (item.id == id) {
        console.log('Removing old car from selected with id ' + item.id);
        this.oldCarsSelected.splice(index, 1);
        console.log('oldCarsSelected');
        console.log(this.oldCarsSelected);
        this.oldCarIdsSelected.splice(index,1);
        console.log('oldCarIdsSelected');
        console.log(this.oldCarIdsSelected);
      }
    });
    //this.fetchCarCompareTitle();
  }

  public getVariantListByCarId(carId: any) {
    let requestUrl =
      'https://car-service-urtjok3rza-wl.a.run.app/cars/' +
      carId +
      '?city=Bhubaneswar';
    return this.http.get<any>(requestUrl);
  }

  // getVariantByCarNameVariantName(carName: any, variantName: any) {  //srujana changes commented
  public getVariantByCarNameVariantName(carName: any, variantName: any) {
    console.log("In getVariantByCarNameVariantName");

    let requestUrl =
      'https://car-service-urtjok3rza-wl.a.run.app/cars/variant?carName=' +
      carName +
      '&variantName=' +
      variantName;
      let variantPresent = false;
     this.http.get<any>(requestUrl).subscribe((response: any) => {
       console.log("Response Data ", response.data);

      for(let item of this.newCarIdsSelected){
        console.log("Id already present in new Car " + item);
        if(item==response.data.id){
          variantPresent=true;
          break;
        }
      }
      if(!variantPresent){
        console.log("Variant not added to compare.. so adding");
        this.newCarsSelected.push(response.data);
      }

      console.log('this.newCarsSelected ');
      console.log(this.newCarsSelected);
    });

  }

  public removeSelectedVariant(variantId: any) {
    console.log('In removeSelectedVariant ');

    this.newCarsSelected.forEach((item, index) => {
      console.log(item);

      if (item.id == variantId) {
        console.log('Removing new car from selected with id ' + item.id);
        this.newCarsSelected.splice(index, 1);
        console.log('newCarsSelected');
        console.log(this.newCarsSelected);
        this.newCarIdsSelected.splice(index,1);
        console.log('newCarsSelected');
        console.log(this.newCarIdsSelected);
      }
    });
    this.fetchCarCompareTitle();

  }

  fetchCarCompareTitle(){
    if(this.carType=="New"){
      // this.newCarsSelected.forEach((item,index)=>{
      //   console.log("Pushing New" + item.carBrand.name + " " + item.carName + " " + item.variantName);
      //   if(index !=0 && index != this.newCarsSelected.length){
      //     this.carNamesTitle = this.carNamesTitle + " vs " + item.carBrand.name + " " + item.carName + " " + item.variantName;
      //   }
      //   else{
      //     this.carNamesTitle = this.carNamesTitle + " " + item.carBrand.name + " " + item.carName + " " + item.variantName;
      //   }
      // });
    }else{
      // this.newCarsSelected.forEach((item, index)=>{
      //   console.log("Pushing Used" + item.brand.name + " " + item.carName + " " + item.variantName);
      //   if(index !=0 && index != this.newCarsSelected.length){
      //     this.carNamesTitle = this.carNamesTitle + " vs " + item.brand.name + " " + item.carName + " " + item.variantName;
      //   }
      //   else{
      //     this.carNamesTitle = this.carNamesTitle + " " + item.brand.name + " " + item.carName + " " + item.variantName;
      //   }
      // });
    }
  }
}
