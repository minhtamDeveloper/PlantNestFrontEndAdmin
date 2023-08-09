
import { Component, OnInit ,} from "@angular/core";
import { FormBuilder, FormGroup} from "@angular/forms";
import { Router } from "@angular/router";


@Component({
    selector:'app-root',
    templateUrl:'./login.component.html',

})

//interface laf implements
export class LoginComponnent implements OnInit{

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        ){}
    ngOnInit() {
    }

}
