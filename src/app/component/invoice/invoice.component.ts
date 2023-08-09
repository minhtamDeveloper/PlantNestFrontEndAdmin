import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'app-root',
    templateUrl:'./invoice.component.html',

})

//interface laf implements
export class InvoiceComponent implements OnInit{


  activeBouquet!: string;
  constructor(
    private router: Router
  ){}
    ngOnInit() {

    }

}
