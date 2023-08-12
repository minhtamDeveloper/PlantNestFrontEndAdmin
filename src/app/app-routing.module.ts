import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { LoginComponnent } from './login/login.component';
import { AdminComponnent } from './component/admin/admin.component';
import { AccountComponent } from './component/account/account.component';
import { ContactComponent } from './component/contact/contact.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { InvoiceDetailComponent } from './component/detail/invoice/invoicedetail.component';
import { SuplierComponent } from './component/suplier/suplier.component';
import { ProductDetailComponent } from './component/detail/product/productdetail.component';
import { ProductAddComponent } from './component/add/product/productadd.component';


const routes: Routes = [
  {path: 'login', component: LoginComponnent},
  {
    path: 'admin', component: AdminComponnent, children:[
      // {path: '', component: DashboardComponnent},
      {path: 'product', component: ProductComponent},
      {path: 'account', component: AccountComponent},
      {path: 'contact', component: ContactComponent},
      {path:'invoice', component: InvoiceComponent},
      {path:'suplier', component: SuplierComponent},
      {path:'detail/invoice', component: InvoiceDetailComponent},
      {path:'detail/product', component: ProductDetailComponent},
      {path:'add/product', component: ProductAddComponent},
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
