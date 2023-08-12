import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";
import { Supplier } from "src/app/model/supplier.model";
import { SupplierAPIService } from "src/app/service/supplier.service";

@Component({
    selector:'app-root',
    templateUrl:'./suplier.component.html',

})

//interface laf implements
export class SuplierComponent implements OnInit{

  SupplierList : Supplier[];
  page : number;
  constructor(
      private SupplierService: SupplierAPIService,
      private router : Router,
  ){}
  ngOnInit() {

      this.SupplierService.showAll().then(
          result => {
            this.SupplierList = result as Supplier[];
            console.log(this.SupplierList);
          },
          error =>{
            console.log(error);
          }
        )
  }
  Search(evt : any){
    var keyword = evt.target.value.toUpperCase();
    if(keyword == ''){
      this.SupplierService.showAll().then(
        result => {
          this.SupplierList = result as Supplier[];
          console.log(this.SupplierList);

        },
        error =>{
          console.log(error);
        }
      )
    }else{
      this.SupplierService.search(keyword).then(
        res =>{
            this.SupplierList = res as Supplier[];
            console.log(this.SupplierList);
        },
        err =>{
            console.log(err);
        }
    )
    }
  }
}