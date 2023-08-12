import { Component, OnInit ,} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Category } from "src/app/model/category.model";
import { CategoryService } from "src/app/service/categoty.service";
import { ValidatorData } from "src/app/service/validatorData.service";

@Component({
    selector:'category_2_create',
    templateUrl:'./create2.component.html',

})

//interface laf implements
export class CategoryAdd2Component implements OnInit{

  activeBouquet!: string;
  formGroup:FormGroup;
  selectedFileUrl: string = '';
       fileData:File;
  options:{value:'',label:''}[]=[];
  valueCategory:string='';
  allCategory:Category[];
  isLoading:boolean=false;
  constructor(
    private router: Router,



      private categoryService: CategoryService,
      public validationService :ValidatorData,



  ){}
    ngOnInit() {
      this.selectedFileUrl='';
      this.options=[];
      this.valueCategory='';
      this.isLoading = false;
      this.allCategory = [];

      this.formGroup = this.categoryService.getFormGroup();
      this.categoryService.getAll().then(category => {
          this.allCategory = category as Category[];
          this.options = this.buildOptions(this.allCategory);

      }).catch(error => {
        this.validationService.getNotification(false,"Can not load Data!");
      })

    }
    submit(){

      if(!this.validationService.checkFormGroupSubmit(this.formGroup)){
        this.validationService.getNotification(false,"Something wrong ");
      return ;
      }

      // if(!this.validationService.checkFormGroupSubmit(this.formGroup)){
      //   this.validationService.getNotification(false,"Something wrong ");
      // return ;
      // }

this.isLoading=true;
    var a=  this.formGroup.value as Category;



    // this.categoryService.create(this.categoryService.formData(a,this.fileData)).then(success =>{
    //   this.validationService.getNotification(true,"Success created ");
    // }).catch(Error =>this.validationService.getNotification(false,Error.error)).finally(()=>{
    //   setTimeout(()=>{
    //     this.isLoading=false;
    //   },100)
    // });


    }

    handleFileSelect(event: any) {
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        this.fileData = fileList[0];
        const fileReader: FileReader = new FileReader();

        fileReader.addEventListener('load', () => {
          this.selectedFileUrl = fileReader.result as string;
        });

        fileReader.readAsDataURL(this.fileData);
      } else {
        this.selectedFileUrl = '';
      }
    }

     buildOptions(items:Category[], parentId = null, indent = '') {
      const options = [];

      items
        .filter(item => item.categoryId=== parentId)
        .forEach(item => {
          options.push({ value: item.id, label: indent + item.categoryName });

          const children = this.buildOptions(items, item.id, indent + '--');
          options.push(...children);
        });

      return options;
    }
}
