import { Injectable } from "@angular/core";

@Injectable()
export class BaseURLService{
  // thay đường dẫn vào đây
  private BASE_URL: string = "http://localhost:5224/api/";
  getBaseUrl(): string{
    return this.BASE_URL;
  }
  getBase():string{
    return this.baseUrl;
  }
  private readonly baseUrl = "https://localhost:5224/";
}
