import { AfterViewInit, Component, OnInit ,} from "@angular/core";
import { Router } from "@angular/router";
import { Category } from "src/app/model/category.model";

import { BaseURLService } from "src/app/service/baseurl.service";

import { CategoryService } from "src/app/service/categoty.service";
import { ValidatorData } from "src/app/service/validatorData.service";
declare let $:any ;

@Component({
    selector:'index_category',
    templateUrl:'./index.component.html',

})

//interface laf implements
export class CategoryIndexComponent implements OnInit,AfterViewInit{


  activeBouquet!: string;
  allCategory:Category[];
  dataCategory:Category[];

  urlImage:string;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    public validationService :ValidatorData,

    private baseUrl:BaseURLService,

  ){}
  ngOnInit() {
    this.allCategory=[];
    this.dataCategory=[];

    this.urlImage=this.baseUrl.getBase();
  }
  ngAfterViewInit(): void {



    this.categoryService.getAll().then(allCategory=>{
          this.allCategory = allCategory as Category[];
        this.dataCategory=this.buildOptions(this.allCategory);
        setTimeout(()=>{
              $('#tableProductIndex').DataTable({
      "paging": true,
      "lengthChange": true,
      "searching": true,
      "ordering": true,
      "info": true,
      "autoWidth": true,
      "responsive": true,

      "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
        },300);
    }).catch(error=>{
      this.validationService.getNotification(false,error.error)
    })

  }

    buildOptions(items:Category[], parentId = null, indent = '',number=1):Category[] {
      const options : Category[]= [];

      items
        .filter(item => item.categoryId=== parentId)
        .forEach(item => {
          item.categoryName = number+'.'+indent+item.categoryName;
         options.push(item);

          const children = this.buildOptions(items, item.id, indent + '--',number+1);
          options.push(...children);
        });

      return options;
    }
    update(idUpdate:any){
      this.router.navigate(['/update-category',{id:idUpdate}])
    }
    detail(idDetail:any){
      this.router.navigate(['/detail-category',{id:idDetail}])
    }

}
