
import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";



@Component({
    selector:'app-root',
    templateUrl:'./admin.component.html',

})

//interface laf implements
export class AdminComponnent implements OnInit{
    constructor(
        private router: Router,
        ){}
    ngOnInit() {

    }
}
