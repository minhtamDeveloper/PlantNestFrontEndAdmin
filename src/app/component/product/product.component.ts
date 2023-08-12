import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";
import { Product123 } from "src/app/model/product123.model";
import { ProductAPIService } from "src/app/service/product.service";


@Component({
    selector:'app-root',
    templateUrl:'./product.component.html',

})

//interface laf implements
export class ProductComponent implements OnInit{


  ProductList : Product123[];
  page : number;
  constructor(
      private ProductService: ProductAPIService,
      private router : Router,
  ){}
  ngOnInit() {

      this.ProductService.showAll().then(
          result => {
            this.ProductList = result as Product123[];
            console.log(this.ProductList);
          },
          error =>{
            console.log(error);
          }
        )
  }
  Search(evt : any){
    var keyword = evt.target.value.toUpperCase();
    if(keyword == ''){
      this.ProductService.showAll().then(
        result => {
          this.ProductList = result as Product123[];
          // console.log(this.ProductList);

        },
        error =>{
          console.log(error);
        }
      )
    }else{
      this.ProductService.search(keyword).then(
        res =>{
            this.ProductList = res as Product123[];
            console.log(this.ProductList);
        },
        err =>{
            console.log(err);
        }
    )
    }
  }
}