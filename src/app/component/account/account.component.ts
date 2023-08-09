import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'app-root',
    templateUrl:'./account.component.html',

})

//interface laf implements
export class AccountComponent implements OnInit{


  activeBouquet!: string;
  constructor(
    private router: Router
  ){}
    ngOnInit() {

    }

}
