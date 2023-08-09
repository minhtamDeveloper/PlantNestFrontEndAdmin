import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'app-root',
    templateUrl:'./product.component.html',

})

//interface laf implements
export class ProductComponent implements OnInit{


  activeBouquet!: string;
  constructor(
    private router: Router
  ){}
    ngOnInit() {

    }

}
