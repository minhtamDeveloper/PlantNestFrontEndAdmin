import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './component/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponnent } from './login/login.component';
import { AdminComponnent } from './component/admin/admin.component';
import { AccountComponent } from './component/account/account.component';
import { ContactComponent } from './component/contact/contact.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { InvoiceDetailComponent } from './component/detail/invoice/invoicedetail.component';
import { SuplierComponent } from './component/suplier/suplier.component';
import { ProductDetailComponent } from './component/detail/product/productdetail.component';
import { ProductAddComponent } from './component/add/product/productadd.component';
import { BaseURLService } from './service/baseurl.service';
import { ValidatorData } from './service/validatorData.service';
import { CategoryIndexComponent } from './component/category/index.compoent';
import { CategoryAdd2Component } from './component/category/create2.component';
import { CategoryService } from './service/categoty.service';
import { CategoryUpdateComponent } from './component/category/update.component';
import { RegexApi } from './service/regex.service';
import { CategoryDetailComponent } from './component/category/detail.component';
import { Product123Service } from './service/product123.service';
import { ProductUpdateComponent } from './component/add/product/productUpdate.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponnent,
    ProductComponent,
    LoginComponnent,
    AccountComponent,
    ContactComponent,
    InvoiceComponent,
    SuplierComponent,
    InvoiceDetailComponent,
    ProductDetailComponent,
    ProductAddComponent,
    CategoryIndexComponent,

CategoryAdd2Component,
CategoryUpdateComponent,
CategoryDetailComponent,
ProductUpdateComponent

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
    BaseURLService,ValidatorData,CategoryService,RegexApi,Product123Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
