
import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/service/login/login.service";



@Component({
    selector:'app-root',
    templateUrl:'./admin.component.html',

})

//interface laf implements
export class AdminComponnent implements OnInit{
    constructor(
        private router: Router,
        private loginService:LoginService,
        
        ){}
    ngOnInit() {
     
    }
    signOut(){
        localStorage.clear();
        this.router.navigate(['/login']);
    }
    
}
