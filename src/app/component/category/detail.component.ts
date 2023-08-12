import { Component, OnInit ,} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "src/app/model/category.model";
import { BaseURLService } from "src/app/service/baseurl.service";
import { CategoryService } from "src/app/service/categoty.service";
import { RegexApi } from "src/app/service/regex.service";
import { ValidatorData } from "src/app/service/validatorData.service";

@Component({
    selector:'category-detail',
    templateUrl:'./detail.component.html',

})

//interface laf implements
export class CategoryDetailComponent implements OnInit{

  activeBouquet!: string;
  formGroup:FormGroup;
  selectedFileUrl: string = '';
       fileData:File;
  options:{value:'',label:''}[]=[];
  valueCategory:string='';
  allCategory:Category[];
  isLoading:boolean=false;
  id:string;
  dataCategory:Category;
  //kiểm tra trạng thái delete
  isDelete:boolean;
  healDelete:boolean;
  constructor(
    private router: ActivatedRoute,



      private categoryService: CategoryService,
      public validationService :ValidatorData,

      private regex : RegexApi,
      private baseUrl:BaseURLService,

  ){}
    ngOnInit() {

      this.selectedFileUrl='';
      this.options=[];
      this.valueCategory='';
      this.isLoading = false;
      this.allCategory = [];
      this.id='';
      this.id='12';
      this.dataCategory=new Category();
      this.isDelete=false;
     this.id = this.router.snapshot.paramMap.get('id') ;
      //Kiểm tra id có đúng là int ko
      if(!this.regex.Interger.test(this.id)) this.validationService.getErrorRouterChange("Url can not  found");



      this.categoryService.getAll().then(Allcategory => {
        this.categoryService.getById(this.id).then(category=>{
          this.allCategory = Allcategory as Category[];


       console.log(this.allCategory);
          this.options = this.buildOptions(this.allCategory);
          this.dataCategory =category as Category;
          this.formGroup = this.categoryService.getFormGroup(this.dataCategory);
          if(this.dataCategory.categoryImage!=null&&this.dataCategory.categoryImage!='') this.selectedFileUrl=this.baseUrl.getBase()+this.dataCategory.categoryImage;

          //xử lý delete ;
          this.healDelete=this.dataCategory.status;
          if(this.healDelete){
            this.isDelete = this.allCategory.some(c => c.categoryId==this.dataCategory.id);

          }


        }).catch(error => {
          this.validationService.getNotification(false,"Can not load Data!");
        })
      }).catch(error => {
        this.validationService.getNotification(false,"Can not load Data!");
      });

    }



     buildOptions(items:Category[], parentId = null, indent = '') {
      const options = [];

      items
        .filter(item => item.categoryId=== parentId )
        .forEach(item => {
          options.push({ value: item.id, label: indent + item.categoryName });

          const children = this.buildOptions(items, item.id, indent + '--');
          options.push(...children);
        });

      return options;
    }

   
}
