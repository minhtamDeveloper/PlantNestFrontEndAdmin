import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'app-root',
    templateUrl:'./invoicedetail.component.html',

})

//interface laf implements
export class InvoiceDetailComponent implements OnInit{

  activeBouquet!: string;
  constructor(
    private router: Router
  ){}
    ngOnInit() {

    }

}
