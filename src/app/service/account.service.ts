import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { AccountModel } from "../model/account.model";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AccountAPIService{
   constructor(
    private baseUrlService:BaseURLService,
    private httpClient: HttpClient,
){}
async showAll(){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl()+'account/showAll'));
  }
async search(keyword : string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl()+'account/search/'+keyword));
  }


}
