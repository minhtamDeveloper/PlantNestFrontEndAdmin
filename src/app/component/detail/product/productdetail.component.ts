import { Component, OnInit ,} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Img } from "src/app/model/images.model";
import { Product123 } from "src/app/model/product123.model";
import { ImagesAPIService } from "src/app/service/images.service";
import { ProductAPIService } from "src/app/service/product.service";



@Component({
    selector:'app-root',
    templateUrl:'./productdetail.component.html',

})

//interface laf implements
export class ProductDetailComponent implements OnInit{

  ImgList : Img[];
  ProductList : Product123;
  page : number;
  constructor(
      private ImgService: ImagesAPIService,
      private router : Router,
     private activatedRoute: ActivatedRoute,
     private ProductService: ProductAPIService,

  ){}
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p=>{
      var proId = p.get('productId');

      this.ProductService.SearchId(proId).then(
        result => {
          this.ProductList = result as Product123;
          console.log(this.ProductList);
        },
        error =>{
          console.log(error);
        }
      )
    }),
    this.activatedRoute.paramMap.subscribe(p=>{
      var ImgId = p.get('imgid');

      this.ImgService.Img(ImgId).then(
        result => {
          this.ImgList = result as Img[];
          console.log(this.ImgList);
        },
        error =>{
          console.log(error);
        }
      )
    })
  }

}
