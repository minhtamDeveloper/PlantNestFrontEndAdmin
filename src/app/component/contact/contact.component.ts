import { Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";
import { Contact } from "src/app/model/contact.model";
import { ContactService } from "src/app/service/contact.service";


@Component({
    selector:'app-root',
    templateUrl:'./contact.component.html',

})

//interface laf implements
export class ContactComponent implements OnInit{

  contacts?: Contact[];
  constructor(
    private contactService: ContactService,
    private router: Router
  ){}

  
  ngOnInit() {
      this.contactService.findAll().then(
          result => {
            this.contacts = result as Contact[];
            console.log(this.contacts);
          },
          error =>{
            console.log(error);
          }
        )
   
  }

  delete(id: any){
    var result = confirm("Are you sure ?");
    if(result){
      this.contactService.delete(id).then(
        res => {
          var rs2 = res as boolean;
          if(rs2){
            alert('Done');
          }
          else{
              alert('Failed')
          }
  }
      )
    }
  }

  details(){
    
  }

}
