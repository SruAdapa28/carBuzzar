import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { DealerService } from 'src/app/services/dealer.service';
import { Router } from '@angular/router';
import { VariantService } from 'src/app/services/variant.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  brands:any[]=[];
  dealerList: any[] = [];
  filteredDealers: any[]=[];
  brandName: string ="";
  brandNameVs: string ="";
  brandId: number=0;
  brandIdVs: number=0;
  modelName: string="";
  models : any[] = [];
  modelsVs : any[] = [];
  router: Router;

  constructor(private brandService:BrandService, private dealerService:DealerService,
    private variantService:VariantService,
    router:Router) {
    this.router = router;
  }

  ngOnInit(): void {
    this.brandService.fetchBrand().subscribe(
      (response:any)=> {
        console.log(response.data);
        this.brands = response.data;
      }
    )
    this.dealerService.getAllDealers().subscribe(
      (response:any)=> {
          this.dealerList = response.data;
          console.log("Al dealers = " + this.dealerList);
      });
  }

  dealerFilter(event:any){
    console.log("Inside Filter");
    this.filteredDealers.splice(0,this.filteredDealers.length);
    console.log("dealerList ="+this.dealerList);
    this.dealerList.forEach((item,index)=>{
      if(item.brand.name === event.target.value){
        this.filteredDealers.push(item);
        console.log(this.filteredDealers);
      }
    });
  }




  // Car Comparision
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

  modelId:number=0;
  variants:any[]=[];
  setModelId(event : any){
    console.log(event);
    this.modelId = event.target.value;
    console.log("Model Id = "+ this.modelId);
    this.variantService.getVariantListByCarId(this.modelId).subscribe(
    (response:any)=>{
    this.modelName = response.data.name
    console.log(this.modelName);
    this.variants = response.data.variants;
    console.log("Variant List " + this.variants);
   }  )
  }



  setModelName(event : any){
    this.modelName = event.target.value;
    console.log("Model = "+ this.modelName);
  }


//Car compare vs

setBrandIdVs(event : any){
  this.brandIdVs = event.target.value;
  console.log("Brand = "+ this.brandId);
  this.brandService.fetchModelsBasedOnBrands(this.brandIdVs).subscribe(
    (response:any)=>{
      this.modelsVs = response.data;
      console.log("Brand Name " );
    this.brandNameVs = response.data[0].brand.name;

    console.log(response.data[0].brand.name);
    }
  )

  console.log("Models " + this.models);
}


modelIdVs:number=0;
variantsVs:any[]=[];
modelNameVs:string="";
setModelIdVs(event : any){
  console.log(event);
  this.modelIdVs = event.target.value;
  console.log("Model Id = "+ this.modelId);
  this.variantService.getVariantListByCarId(this.modelIdVs).subscribe(
  (response:any)=>{
  this.modelNameVs = response.data.name
  console.log(this.modelNameVs);
  this.variantsVs = response.data.variants;
  console.log("Variant List " + this.variantsVs);
 }  )
}

setModelNameVs(event : any){
  this.modelNameVs= event.target.value;
  console.log("Model = "+ this.modelName);
}


varientid:number=0;
varientidVs:number=0;
allVarientIds:number[]=[];
setVarient(event:any){
  this.varientid= event.target.value;
  console.log("VarientId1 = "+this.varientid);
  this.allVarientIds.push(this.varientid);
  this.variantService.fetchNewVariantsById(this.allVarientIds);

}
setVarientVs(event:any){
  this.varientidVs= event.target.value;
  console.log("VarientId2 = "+this.varientidVs);
  this.allVarientIds.push(this.varientidVs);
  this.variantService.fetchNewVariantsById(this.allVarientIds);
}

onCompareCars(){
  console.log("Compare Cars from home");
  console.log(this.allVarientIds);

  this.router.navigate(['compare', 'New']);
}


//Know Your Car

carId: number=0;
setCarId(event:any){
  this.carId = event.target.value;
}

onSearchKnowYourCar(){
  console.log(this.carId);
  this.router.navigate(['details', 'new', this.carId]);
}



//Know your dealer
  dealerId: number=0;
  setDealerID(event:any){
    this.dealerId= event.target.value;
    console.log("DealerId="+this.dealerId);
  }

  onSearchKnowYourDealer(){
    this.router.navigate(['dealer', this.dealerId]);
  }

}
