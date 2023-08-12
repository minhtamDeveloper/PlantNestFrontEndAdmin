import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ProductAPIService{
   constructor(
    private baseUrlService:BaseURLService,
    private httpClient: HttpClient,
){}
async showAll(){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl()+'product/showAll'));
  }
async search(keyword : string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl()+'product/search/'+keyword));
  }
async SearchId(id : string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl()+'product/searchBySupId/'+id));
  }
async Img(id : string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl()+'product/ImgId/'+id));
  }
}
