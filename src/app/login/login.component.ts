import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountModel } from '../model/account.model';
import { JsonPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { async } from '@angular/core/testing';
import { UserstoreService } from '../service/userstore/userstore.service';

@Component({
  //selector: 'app-root',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit  {
  form: FormGroup;
  constructor(
    private loginService: LoginService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginStoreService: UserstoreService
    ){

  }
  ngOnInit(){
    this.form = this.formBuilder.group({
      username: ["",Validators.required],
      password: ["",Validators.required]
    })
    this.loginStoreService.getRoleFormStore().subscribe(val=>{
      let roleLocal = this.loginService.getRoleFromToken();
      var role = val || roleLocal
     
      if(role =="Admin"){
       this.router.navigate(['/admin'])
    
    }else{
      localStorage.clear();
      this.router.navigate(['/'])
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong! You are not authorized to access',
        showConfirmButton: false,
          timer: 1500
      })
     }
      
  })
  }
  async submit(){
    var data : AccountModel = this.form.value as AccountModel
    var formData = new FormData();
    formData.append("data",JSON.stringify(data));
    this.loginService.processLogin(formData).then(
      res=>{
        var token = res as string;
         this.loginService.storeToken(token)
         location.reload()
       

      },err=>{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong! User Registration failed. '+err['error'],
          showConfirmButton: false,
            timer: 1500
        })
      }
    )
    
  }
  async checkRole(){
   
    
  }
}
