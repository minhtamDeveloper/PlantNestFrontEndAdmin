
import { DatePipe } from "@angular/common";
import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/models/product.models";
import { ProductService } from "src/app/service/product.service";


@Component({
    selector:'app-root',
    templateUrl:'./product.component.html',

})

//interface laf implements
export class ProductComponent implements OnInit{


  ProductList : Product[];
  constructor(
    public datepipe : DatePipe,
    private router: Router,
    private productService : ProductService,
   
  ){}
    ngOnInit() {
      this.productService.findAll().then(
        result => {
          console.log('AVC');
          this.ProductList = result["result"] as Product[];
          console.log(this.ProductList);
        },
        error =>{
          console.log('AVCSSSSSSSSSS');
          console.log(error);
        }
      )
    }

}
