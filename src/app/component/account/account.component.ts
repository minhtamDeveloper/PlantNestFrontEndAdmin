import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";
import { AccountModel } from "src/app/model/account.model";
import { AccountAPIService } from "src/app/service/account.service";

@Component({
    selector:'app-root',
    templateUrl:'./account.component.html',

})

//interface laf implements
export class AccountComponnent implements OnInit{
  AccountList : AccountModel[];
  page : number;
  Total : number;
  testData :AccountModel[];
  constructor(
      private AccountService: AccountAPIService,
      private router : Router,
  ){}
  ngOnInit() {

      this.AccountService.showAll().then(
          result => {
            this.AccountList = result as AccountModel[];
            this.testData = result as AccountModel[];
            console.log(this.AccountList);
            var a =0;
            for(var i = 0; i < this.AccountList.length; i++){
             
                if(this.AccountList[i].status == true && this.AccountList[i].roleId == 4){

                  a = a + 1;
                }
                
                  
               
              
            }
            this.Total = a;
            console.log(a);
          },
          error =>{
            console.log(error);
          }
        )
  }
  getAll(){
    this.AccountService.showAll().then(
      result => {
        this.AccountList = result as AccountModel[];
        this.testData = result as AccountModel[];
        console.log(this.AccountList);
        var a =0;
        for(var i = 0; i < this.AccountList.length; i++){
         
            if(this.AccountList[i].status == true && this.AccountList[i].roleId == 4){

              a = a + 1;
            }       
        }
        this.Total = a;
        console.log(a);
      },
      error =>{
        console.log(error);
      }
    )
  }
  Search(evt : any){
    var keyword = evt.target.value.toUpperCase();
    if(keyword == ''){
      this.AccountService.showAll().then(
        result => {
          this.AccountList = result as AccountModel[];
          console.log(this.AccountList);

        },
        error =>{
          console.log(error);
        }
      )
    }else{
      this.AccountService.search(keyword).then(
        res =>{
            this.AccountList = res as AccountModel[];
            console.log(this.AccountList);
        },
        err =>{
            console.log(err);
        }
    )
    }
    // if(keyword!=null){
    //   this.AccountList = this.testData.filter(x=>x.fullName.toUpperCase().includes(keyword))
    // }
    // else{
     
    // }
  }
}