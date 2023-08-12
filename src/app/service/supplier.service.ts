import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable()
export class SupplierAPIService{
   constructor(
    private baseUrlService:BaseURLService,
    private httpClient: HttpClient,
){}
async showAll(){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl()+'supplier/showAll'));
  }
 
async SearchId(id : string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl()+'supplier/searchBySupId/'+id));
  }
async search (keyword : string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl()+'supplier/search/'+keyword));
  }
}
