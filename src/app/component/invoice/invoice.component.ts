import { DatePipe } from "@angular/common";
import { Component, OnInit ,} from "@angular/core";
import { Order } from "src/app/models/order.models";
import { OrderDetail } from "src/app/models/orderDetail.models";
import { OrderService } from "src/app/service/order.service";
import { OrderDetailService } from "src/app/service/orderDetail.service";
@Component({
    selector:'app-root',
    templateUrl:'./invoice.component.html',

})

//interface laf implements
export class InvoiceComponent implements OnInit{


  OrderList : Order[];
  OrderDetailList : OrderDetail[];
  TotalProduct : number = 0;
  page : number = 1;
  timeType : string = 'all';
  timeNumber : number = 0;
  startdateofweek: any = '0000-01-01';  
  dateClone: any = '0000-01-01';  
  Enddateofweek: any = '9999-12-31';
  name: string;
  Total : number;
  constructor(
    public datepipe : DatePipe,
    private orderDetailService: OrderDetailService,
    private orderService : OrderService,
   
  ){}
    ngOnInit() {
      this.orderDetailService.findAll().then(
        res2 => {
          this.OrderDetailList = res2["result"] as OrderDetail[];
        },
      )
      this.orderService.findAll().then(
        result => {
          this.OrderList = result["result"] as Order[];
          var a = 0;
          var b = 0;
          
          for(var i = 1; i < this.OrderList.length; i++){
            for(var y = 0; y < this.OrderDetailList.length; y++){
              if(this.OrderDetailList[y].orderId == this.OrderList[i].id && this.OrderList[i].status==1){
                b = b + this.OrderDetailList[y].quantity;
              }
            }
            if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
              if(this.OrderList[i].status==1){
                a = a + this.OrderList[i].totalOrder; 
              }
            }
            else{
              this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek);
              
            }  
          }
          
          this.Total = a;
          this.TotalProduct = b;
        },
        error =>{
        
          console.log(error);
        }
      )
    }
    previousPage(){
      if(this.page >1){
        this.page = this.page -1;
      }
    } 
    nextPage(){
      var a = 0;
      var b = 0;
      for(var i = 0; i < this.OrderList.length; i++){
        if(this.OrderList[i].orderDate >= this.startdateofweek){
          if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
            if(this.OrderList[i].status==1){
              a = a + this.OrderList[i].totalOrder; 
            }
          }
          b ++;
        }
      }
      if(this.page<b/10){
        this.page = this.page +1;
      }
      this.Total = a;
    }

    selectStatistical(evt:any){
      var option =evt.target.value;
      let getdate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
      function startOfWeek(date) {  
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : +1);  
        return new Date(date.setDate(diff));  
      }  
      function endofweek(date) {  
        var lastday = date.getDate() - (date.getDay() - 1) + 6;  
        return new Date(date.setDate(lastday));  
      }  
      var dt = new Date(getdate);
      var dt2 = new Date(getdate);  

      if(option == 'all'){
        this.startdateofweek= '0001-01-01';  
        this.Enddateofweek= '9999-12-31';
        this.dateClone = '0001-01-01'; 
        this.timeType = 'all';
      }
      if(option == 'week'){
        this.startdateofweek= this.datepipe.transform(startOfWeek(dt),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(endofweek(dt2),'yyyy-MM-dd');  
        this.timeType = 'week';
      }
      if(option == 'month'){
        this.startdateofweek=this.datepipe.transform(new Date(dt.getFullYear(), dt.getMonth(), 1),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(new Date(dt.getFullYear(), dt.getMonth() + 1, 0),'yyyy-MM-dd');  
        this.timeType = 'month';
      }
      if(option == 'year'){
        this.startdateofweek=this.datepipe.transform(new Date(dt.getFullYear(), 0),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(new Date(dt.getFullYear()+1, 0,-1),'yyyy-MM-dd');  
        this.timeType = 'year';
      }
      this.page = 1;
     
      this.orderService.findAll().then(
        result => {
          this.OrderList = result["result"] as Order[];
          var a = 0;
          var b = 0;
          for(var i = 0; i < this.OrderList.length; i++){
            for(var y = 0; y < this.OrderDetailList.length; y++){
              if(this.OrderDetailList[y].orderId == this.OrderList[i].id && this.OrderList[i].status==1){
                b = b + this.OrderDetailList[y].quantity;
              }
            }
            if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
              if(this.OrderList[i].status==1){
                a = a + this.OrderList[i].totalOrder; 
              }
            }
            else{
              this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek);
              
            }  
          }
          this.Total = a;
          this.TotalProduct = b;
        },
        error =>{
        
          console.log(error);
        }
      )
      
     
    }
    updateRevenue(){
      
      this.orderService.findAll().then(
        result => {
          this.OrderList = result["result"] as Order[];
          var a = 0;
          var b = 0;
          
          for(var i = 1; i < this.OrderList.length; i++){
            for(var y = 0; y < this.OrderDetailList.length; y++){
              if(this.OrderDetailList[y].orderId == this.OrderList[i].id && this.OrderList[i].status==1){
                b = b + this.OrderDetailList[y].quantity;
              }
            }
            if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
              if(this.OrderList[i].status==1){
                a = a + this.OrderList[i].totalOrder; 
              }
            }
            else{
              this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek);
              
            }  
          }
          
          this.Total = a;
          this.TotalProduct = b;
        },
        error =>{
        
          console.log(error);
        }
      )
      
    }
    previousTime(){
      var option = this.timeType;
      this.timeNumber --;
      var getdate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');  
      function startOfWeek(date,number) {  
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : +1+number);  
        return new Date(date.setDate(diff));  
      }  
      function endofweek(date,number) {  
        var lastday = date.getDate() - (date.getDay() - 1) + 6+number;  
        return new Date(date.setDate(lastday));  
      }  
      var dt = new Date(getdate);
      var dt2 = new Date(getdate);  

      if(option == 'all'){
        this.startdateofweek= '0001-01-01';  
        this.Enddateofweek= '9999-12-31';
        this.dateClone = '0001-01-01'; 
        this.timeType = 'all';
      }
      if(option == 'week'){
        this.startdateofweek= this.datepipe.transform(startOfWeek(dt,this.timeNumber*7),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(endofweek(dt2,this.timeNumber*7),'yyyy-MM-dd');  
        this.timeType = 'week';
      }
      if(option == 'month'){
        this.startdateofweek=this.datepipe.transform(new Date(dt.getFullYear(), dt.getMonth()+this.timeNumber, 1),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(new Date(dt.getFullYear(), dt.getMonth() + 1+this.timeNumber, 0),'yyyy-MM-dd');  
        this.timeType = 'month';
      }
      if(option == 'year'){
        this.startdateofweek=this.datepipe.transform(new Date(dt.getFullYear()+this.timeNumber, 0),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(new Date(dt.getFullYear()+1+this.timeNumber, 0,-1),'yyyy-MM-dd');  
        this.timeType = 'year';
      }
      this.page = 1;
     
      this.orderService.findAll().then(
        result => {
          this.OrderList = result["result"] as Order[];
          var a = 0;
          var b = 0;
          for(var i = 0; i < this.OrderList.length; i++){
            for(var y = 0; y < this.OrderDetailList.length; y++){
              if(this.OrderDetailList[y].orderId == this.OrderList[i].id && this.OrderList[i].status==1){
                b = b + this.OrderDetailList[y].quantity;
              }
            }
            if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
              if(this.OrderList[i].status==1){
                a = a + this.OrderList[i].totalOrder; 
              }
            }
            else{
              this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek);
            }
             
          }
          this.Total = a;
          this.TotalProduct = b;
        },
        error =>{
        
          console.log(error);
        }
      )
    }
    nextTime(){
      var option = this.timeType;
      this.timeNumber ++;
      let getdate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');  
      function startOfWeek(date,number) {  
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : +1+number);  
        return new Date(date.setDate(diff));  
      }  
      function endofweek(date,number) {  
        var lastday = date.getDate() - (date.getDay() - 1) + 6+number;  
        return new Date(date.setDate(lastday));  
      }  
      var dt = new Date(getdate);
      var dt2 = new Date(getdate);  

      if(option == 'all'){
        this.startdateofweek= '0001-01-01';  
        this.Enddateofweek= '9999-12-31';
        this.dateClone = '0001-01-01'; 
        this.timeType = 'all';
      }
      if(option == 'week'){
        this.startdateofweek= this.datepipe.transform(startOfWeek(dt,this.timeNumber*7),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(endofweek(dt2,this.timeNumber*7),'yyyy-MM-dd');  
        this.timeType = 'week';
      }
      if(option == 'month'){
        this.startdateofweek=this.datepipe.transform(new Date(dt.getFullYear(), dt.getMonth()+this.timeNumber, 1),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(new Date(dt.getFullYear(), dt.getMonth() + 1+this.timeNumber, 0),'yyyy-MM-dd');  
        this.timeType = 'month';
      }
      if(option == 'year'){
        this.startdateofweek=this.datepipe.transform(new Date(dt.getFullYear()+this.timeNumber, 0),'yyyy-MM-dd');  
        this.Enddateofweek=this.datepipe.transform(new Date(dt.getFullYear()+1+this.timeNumber, 0,-1),'yyyy-MM-dd');  
        this.timeType = 'year';
      }
      this.page = 1;
     
      this.orderService.findAll().then(
        result => {
          this.OrderList = result["result"] as Order[];
          var a = 0;
          var b = 0;
          for(var i = 0; i < this.OrderList.length; i++){
            for(var y = 0; y < this.OrderDetailList.length; y++){
              if(this.OrderDetailList[y].orderId == this.OrderList[i].id && this.OrderList[i].status==1){
                b = b + this.OrderDetailList[y].quantity;
              }
            }
            if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
              if(this.OrderList[i].status==1){
                a = a + this.OrderList[i].totalOrder; 
              }
            }
            else{
              this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek);
            }
          }
          this.Total = a;
          this.TotalProduct = b;
        },
        error =>{
        
          console.log(error);
        }
      )
    }
    selectStatus(evt : any){
      if(evt.target.value == 'all'){
        
        this.orderService.findAll().then(
          result => {
            this.OrderList = result["result"] as Order[];
            var a = 0;
            var b = 0;
            for(var i = 0; i < this.OrderList.length; i++){
              for(var y = 0; y < this.OrderDetailList.length; y++){
                if(this.OrderDetailList[y].orderId == this.OrderList[i].id && this.OrderList[i].status==1){
                  b = b + this.OrderDetailList[y].quantity;
                }
              }
              if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
                if(this.OrderList[i].status==1){
                  a = a + this.OrderList[i].totalOrder; 
                }
              }
              else{
                this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek);
              }
            }
            this.Total = a;
            this.TotalProduct = b;
          },
          error =>{
          
            console.log(error);
          }
        )
      }
      if(evt.target.value == 'paid'){
        
        this.orderService.findAll().then(
          result => {
            this.OrderList = result["result"] as Order[];
            var a = 0;
            var b = 0;
            for(var i = 0; i < this.OrderList.length; i++){
              for(var y = 0; y < this.OrderDetailList.length; y++){
                if(this.OrderDetailList[y].orderId == this.OrderList[i].id && this.OrderList[i].status==1){
                  b = b + this.OrderDetailList[y].quantity;
                }
              }
              if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek && this.OrderList[i].status==1){
                if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
                  if(this.OrderList[i].status==1){
                    a = a + this.OrderList[i].totalOrder; 
                  }
                }
                else{
                  this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek);
                }
              }
              else{
                this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek && item.status==1);
              }
             
            }
            this.Total = a;
            this.TotalProduct = b;
          },
          error =>{
          
            console.log(error);
          }
        )
      }
      if(evt.target.value == 'unpaid'){
        this.orderService.findAll().then(
          result => {
            this.OrderList = result["result"] as Order[];
            
            for(var i = 0; i < this.OrderList.length; i++){
              if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek && this.OrderList[i].status==0){
               
              }
              else{
                this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek && item.status==0);
              }
            }
            this.Total = 0;
            this.TotalProduct = 0;
          },
          error =>{
          
            console.log(error);
          }
        )
      }
      if(evt.target.value == 'cancelled'){
        
        this.orderService.findAll().then(
          result => {
            this.OrderList = result["result"] as Order[];
            
            for(var i = 0; i < this.OrderList.length; i++){
              if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek && this.OrderList[i].status==2){
               
              }
              else{
                this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek && item.status==2);
              }
            }
            this.Total = 0;
            this.TotalProduct = 0;
          },
          error =>{
          
            console.log(error);
          }
        )
      }
    }
    Search(evt : any){
      var keyword = evt.target.value.toUpperCase();
      if(keyword == ''){
        
        this.orderService.findAll().then(
          result => {
            this.OrderList = result["result"] as Order[];
            var a = 0;
            var b = 0;
            for(var i = 0; i < this.OrderList.length; i++){
              for(var y = 0; y < this.OrderDetailList.length; y++){
                if(this.OrderDetailList[y].orderId == this.OrderList[i].id && this.OrderList[i].status==1){
                  b = b + this.OrderDetailList[y].quantity;
                }
              }
              if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek){
                if(this.OrderList[i].status==1){
                  a = a + this.OrderList[i].totalOrder; 
                }
              }
              else{
                this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek);
              }
            }
            this.Total = a;
            this.TotalProduct = b;
          },
          error =>{
          
            console.log(error);
          }
        )
      }else{
        
        
        
        this.orderService.findAll().then(
          
          result => {
            this.OrderList = result["result"] as Order[];
          
            
                this.orderService.findAll().then(
                  result => {
                    var a = 0;
                    var b = 0;
                    this.OrderList = result["result"] as Order[];
                   
                     for(var i = 0; i < this.OrderList.length; i++){
                      for(var y = 0; y < this.OrderDetailList.length; y++){
                        if(this.OrderDetailList[y].orderId == this.OrderList[i].id && this.OrderList[i].status==1){
                          b = b + this.OrderDetailList[y].quantity;
                        }
                      }
                          if(this.OrderList[i].orderDate >= this.startdateofweek && this.OrderList[i].orderDate <= this.Enddateofweek && this.OrderList[i].fullName.toUpperCase().includes(keyword)){
                            if(this.OrderList[i].status==1){
                              console.log(this.OrderList[i].totalOrder)
                              a = a  + this.OrderList[i].totalOrder;
                            }
                          }
                        else{
                          this.OrderList = this.OrderList.filter(item => item.orderDate >= this.startdateofweek && item.orderDate <= this.Enddateofweek && item.fullName.toUpperCase().includes(keyword));
                        }
                    }  
                  },
                  error =>{
                  
                    console.log(error);
                  }
                )
          },
          error =>{
            console.log(error);
          }
        )
      }
    }
}
