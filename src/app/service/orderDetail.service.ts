import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
@Injectable({
    providedIn: 'root'
  })
export class OrderDetailService {
    constructor(
        private BaseUrlService: BaseURLService,
        private HttpClient: HttpClient,
    ){}
    async findByIdOrder(id : string){
        return await lastValueFrom(this.HttpClient.get(this.BaseUrlService.getBaseUrl()+'OrderDetail/findByIdOrder/'+id));
    }
    async findAll(){
        return await lastValueFrom(this.HttpClient.get(this.BaseUrlService.getBaseUrl()+'OrderDetail/findAll'));
    }
}