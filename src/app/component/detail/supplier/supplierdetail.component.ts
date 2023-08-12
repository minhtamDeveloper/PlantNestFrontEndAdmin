import { Component, OnInit ,} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Supplier } from "src/app/model/supplier.model";
import { SupplierAPIService } from "src/app/service/supplier.service";


@Component({
    selector:'app-root',
    templateUrl:'./supplierdetail.component.html',

})

//interface laf implements
export class SupplierDetailComponent implements OnInit{
  SupplierList : Supplier[];
  activeBouquet!: string;
  constructor(
    private router: Router,
    private SupplierService: SupplierAPIService,
    private activatedRoute: ActivatedRoute,
  ){}
    ngOnInit() {
      this.activatedRoute.paramMap.subscribe(p=>{
        var supId = p.get('supplierId');
       
        this.SupplierService.SearchId(supId).then(
          result => {
            this.SupplierList = result as Supplier[];
            console.log(this.SupplierList);
          },
          error =>{
            console.log(error);
          }
        )
      })

    }

}
