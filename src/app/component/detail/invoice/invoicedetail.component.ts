import { DatePipe } from "@angular/common";
import { Component, OnInit ,} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderDetail } from "src/app/model/orderDetail.models";
import { OrderDetailService } from "src/app/service/orderDetail.service";

@Component({
    selector:'app-root',
    templateUrl:'./invoicedetail.component.html',

})

//interface laf implements
export class InvoiceDetailComponent implements OnInit{

  OrderDetailList : OrderDetail[];
  totalProduct : number;
  totalPrice : number;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderDetailService: OrderDetailService,
    public datepipe : DatePipe,
  ){}
    ngOnInit() {
      this.activatedRoute.paramMap.subscribe(p=>{
        var IdOrder = p.get('id');
        this.orderDetailService.findByIdOrder(IdOrder).then(
          res =>{
            this.OrderDetailList = res["result"] as OrderDetail[];
            console.log(this.OrderDetailList);
            var a=0;
            var b=0;
            for(var i = 0; i < this.OrderDetailList.length; i++){
              a = a + this.OrderDetailList[i].quantity;
              b = b + this.OrderDetailList[i].productPrice * this.OrderDetailList[i].quantity;
            }
            this.totalProduct = a;
            this.totalPrice = b;
          },
          err =>{
            console.log(err);
          }
        )
      })
    }

}
