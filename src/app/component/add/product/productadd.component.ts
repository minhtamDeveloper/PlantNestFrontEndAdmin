import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'app-root',
    templateUrl:'./productadd.component.html',

})

//interface laf implements
export class ProductAddComponent implements OnInit{
  isLoading:boolean=false;
  activeBouquet!: string;
  constructor(
    private router: Router
  ){}
    ngOnInit() {

    }

}
