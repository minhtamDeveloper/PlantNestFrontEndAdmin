import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Category } from "../model/category.model";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BaseURLService } from "./baseurl.service";
import { ProductComponent } from "../component/product/product.component";
import { Product } from "../model/product.model";
@Injectable()
export class Product123Service {
  constructor (
    private formBuilder:FormBuilder,
    private http: HttpClient,
    private baseUrl:BaseURLService
    ) { }
    getFormGroup(data?:Product):FormGroup {
      var a = this.formBuilder.group({

        productName: ['', [Validators.required, Validators.maxLength(200)]],
        description: ['', [Validators.required, Validators.maxLength(1000)]],
        costPrice: [1, [Validators.required, Validators.min(1)]],
        sellPrice: [1, [Validators.required, Validators.min(1)]],
        quantity: [1, [Validators.required, Validators.min(1)]],
        createdDate: ['', Validators.required],
        supplierId: ['', Validators.required],
        categoryId: ['', Validators.required],
        status: [null,]
      });

      if(data != null) {
        a.controls.productName.setValue(data.productName);
        a.controls.description.setValue(data.description);

a.controls.costPrice.setValue(data.costPrice);

a.controls.sellPrice.setValue(data.sellPrice);

a.controls.quantity.setValue(data.quantity);

a.controls.createdDate.setValue(  new Date(data.createdDate).toISOString().substring(0, 10)
);

a.controls.supplierId.setValue(data.supplierId+'');

a.controls.categoryId.setValue(data.categoryId+'');

a.controls.status.setValue(data.status);
      }

      return a;
    }
    formData(data:Product,file?:File,fileSide? :File[]):FormData{
      var a= new FormData();
      a.append('data',JSON.stringify(data));
      if(file!=null) a.append('file',file);
      if(fileSide!=null && fileSide.length>0){

          for(var i=0;i<fileSide.length;i++){
            a.append('fileSide',fileSide[i]);

          }
      }
       return a;
     }
    async getAllSuplier(){
      return await lastValueFrom(this.http.get(this.baseUrl.getBaseUrl()+'Product/Thang/getAllSupplier'));

    }
    async create(formData:FormData){
      return await lastValueFrom(this.http.post(this.baseUrl.getBaseUrl()+'Product/Thang/create',formData));

    }
    async getByIdUpdate(id:string){
      return await lastValueFrom(this.http.get(this.baseUrl.getBaseUrl()+'Product/Thang/byId/'+id));

    }
    async update(formData:FormData,id:string){
      return await lastValueFrom(this.http.put(this.baseUrl.getBaseUrl()+'Product/Thang/update/'+id,formData));

    }
  }
