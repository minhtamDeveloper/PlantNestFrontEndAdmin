import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Category } from "../model/category.model";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BaseURLService } from "./baseurl.service";

import { SelectDeQuy } from "../model/selectDeQuy.model";

@Injectable()
export class CategoryService {
  constructor (
    private formBuilder:FormBuilder,
    private http: HttpClient,
    private baseUrl:BaseURLService
    ) { }
  getFormGroup(data?:Category):FormGroup{
      var a = this.formBuilder.group({

        categoryId: [''],

        categoryName: ['', Validators.required],

      });
      if(data!=null){
        if(data.categoryId!=null)   a.controls.categoryId.setValue(data.categoryId+'');

        a.controls.categoryName.setValue(data.categoryName);
      }
      if(!data.status){
        a.controls.categoryId.disable();

        a.controls.categoryName.disable();
      }
    return a;
  }

  buildOptions(items:Category[], parentId = null, indent = ''):SelectDeQuy[] {
    const options :SelectDeQuy[] = [];

    items
      .filter(item => item.categoryId=== parentId)
      .forEach(item => {
        options.push({ value: item.id+'', label: indent + item.categoryName });

        const children = this.buildOptions(items, item.id, indent + '--');
        options.push(...children);
      });

    return options;
  }

  formData(category:Category,file?:File):FormData{
    var a= new FormData();
    a.append('data',JSON.stringify(category));
    if(file!=null) a.append('file',file);

     return a;
   }
  async getAll(){
    return await lastValueFrom(this.http.get(this.baseUrl.getBaseUrl()+'Category/getAll'));

  }
  async getById(id:string){
    return await lastValueFrom(this.http.get(this.baseUrl.getBaseUrl()+'Category/getById/'+id));


  }

  async create(formData: FormData){
    return await lastValueFrom(this.http.post(this.baseUrl.getBaseUrl()+'Category/create',formData));
//return await lastValueFrom(this.http.post('https://localhost:7224/api/Category/create', formData));

  }
  async update(formData: FormData,id:string){
    return await lastValueFrom(this.http.put(this.baseUrl.getBaseUrl()+'Category/update/'+id,formData));
  }
  async delete(id:string){
    return await lastValueFrom(this.http.delete(this.baseUrl.getBaseUrl()+'Category/delete/'+id));
  }
  async enable(id:string){
    return await lastValueFrom(this.http.delete(this.baseUrl.getBaseUrl()+'Category/enable/'+id));
  }


}
