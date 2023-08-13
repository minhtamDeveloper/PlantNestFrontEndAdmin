import { Injectable } from "@angular/core";
import { BaseURLService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Contact } from "../model/contact.model";


@Injectable({
  providedIn: 'root'
})
export class ContactService{
 constructor(
  private baseURLService: BaseURLService,
  private httpClient: HttpClient
 ){}

 async findAll(){
  return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl()+'contact/findAll'));
}

async create(contact: Contact){
  return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl()+ 'contact/addnew/', contact));
}

async delete(id: string){
  return await lastValueFrom(this.httpClient.delete(this.baseURLService.getBaseUrl() + 'contact/delete/' + id))
}
}