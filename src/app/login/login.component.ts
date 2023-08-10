
import { Component, OnInit ,} from "@angular/core";
import { FormBuilder, FormGroup} from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";


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
    simpleAlert(){
      {
        Swal.fire({
          icon: 'success',
          title: 'Login success',
          text: 'Welcome To AKT4',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    }

}
