import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'app-root',
    templateUrl:'./productdetail.component.html',

})

//interface laf implements
export class ProductDetailComponent implements OnInit{

  activeBouquet!: string;
  constructor(
    private router: Router
  ){}
    ngOnInit() {

    }

}
