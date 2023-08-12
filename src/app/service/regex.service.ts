import { Injectable } from "@angular/core";





@Injectable({
  providedIn: 'root'
})
export class RegexApi{
  readonly PhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  readonly Interger = /^\d+$/;

}
