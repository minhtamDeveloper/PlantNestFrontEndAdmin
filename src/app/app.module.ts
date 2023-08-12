import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './component/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponnent } from './login/login.component';
import { AdminComponnent } from './component/admin/admin.component';

import { ContactComponent } from './component/contact/contact.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { InvoiceDetailComponent } from './component/detail/invoice/invoicedetail.component';
import { SuplierComponent } from './component/suplier/suplier.component';
import { ProductDetailComponent } from './component/detail/product/productdetail.component';
import { ProductAddComponent } from './component/add/product/productadd.component';
import { BaseURLService } from './service/baseurl.service';
import { AccountAPIService } from './service/account.service';
import { SupplierAPIService } from './service/supplier.service';
import { AccountComponnent } from './component/account/account.component';
import { SupplierDetailComponent } from './component/detail/supplier/supplierdetail.component';
import { ProductAPIService } from './service/product.service';
import { ImagesAPIService } from './service/images.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponnent,
    ProductComponent,
    LoginComponnent,
    AccountComponnent,
    ContactComponent,
    InvoiceComponent,
    SuplierComponent,
    InvoiceDetailComponent,
    ProductDetailComponent,
    SupplierDetailComponent,
    ProductAddComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    ,
  ],
  providers: [
    BaseURLService,
    AccountAPIService,
    SupplierAPIService,
    ProductAPIService,
    ImagesAPIService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
