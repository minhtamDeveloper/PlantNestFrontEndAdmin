import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';

import { AdminComponnent } from './component/admin/admin.component';

import { ContactComponent } from './component/contact/contact.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { InvoiceDetailComponent } from './component/detail/invoice/invoicedetail.component';
import { SuplierComponent } from './component/suplier/suplier.component';
import { ProductDetailComponent } from './component/detail/product/productdetail.component';
import { ProductAddComponent } from './component/add/product/productadd.component';
import { AccountComponnent } from './component/account/account.component';
import { SupplierDetailComponent } from './component/detail/supplier/supplierdetail.component';
import { authAdminGuard } from './guard/auth-admin.guard';
import { LoginComponent } from './login/login.component';
import { ProductUpdateComponent } from './component/add/product/productUpdate.component';
import { CategoryAdd2Component } from './component/category/create2.component';
import { CategoryDetailComponent } from './component/category/detail.component';
import { CategoryIndexComponent } from './component/category/index.compoent';
import { CategoryUpdateComponent } from './component/category/update.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {
    path: 'admin', component: AdminComponnent,canActivate:[authAdminGuard], children:[
     {path: '', component: AccountComponnent},
      {path: 'product', component: ProductComponent},
      {path: 'account', component: AccountComponnent},
      {path: 'contact', component: ContactComponent},
      {path:'invoice', component: InvoiceComponent},
      {path:'suplier', component: SuplierComponent},
      {path:'detail/invoice', component: InvoiceDetailComponent},
      {path:'detail/product', component: ProductDetailComponent},
      {path:'detail/supplier', component: SupplierDetailComponent},
      {path:'add/product', component: ProductAddComponent},
      {path: 'update-product', component: ProductUpdateComponent},
      {path: 'add-category', component: CategoryAdd2Component},
      {path: 'detail-category', component: CategoryDetailComponent},
      {path: 'category', component: CategoryIndexComponent},
      {path: 'update-category', component: CategoryUpdateComponent},
      
      
      
      
  
    ]},


  //  {
  //   path: '', component: AdminComponnent, children:[
  //     {path: '', component: OrderComponnent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
