import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImagesAPIService{
   constructor(
    private baseUrlService:BaseURLService,
    private httpClient: HttpClient,
){}
async Img(id : string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl()+'images/ImgId/'+id));
  }
}
