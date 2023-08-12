import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import { inject, ɵɵinject } from '@angular/core';
import { UserstoreService } from '../service/userstore/userstore.service';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const login = ɵɵinject(LoginService)
  const loginStore = ɵɵinject(UserstoreService)
  const router = inject(Router)
  var role = "";
  loginStore.getRoleFormStore().subscribe(val=>{
    let roleLocal = login.getRoleFromToken();
    role = val || roleLocal
    
})

  if(login.isLoginIn() && role=="Admin"){
    return true;
  }else{
    router.navigate(["/"])
    return false;
  }
};
