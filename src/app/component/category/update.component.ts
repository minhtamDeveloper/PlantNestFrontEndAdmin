import { Component, OnInit ,} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "src/app/model/category.model";
import { BaseURLService } from "src/app/service/baseurl.service";
import { CategoryService } from "src/app/service/categoty.service";
import { RegexApi } from "src/app/service/regex.service";
import { ValidatorData } from "src/app/service/validatorData.service";

@Component({
    selector:'category-update',
    templateUrl:'./update.component.html',

})

//interface laf implements
export class CategoryUpdateComponent implements OnInit{

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
      this.id='13';
      this.dataCategory=new Category();
      this.isDelete=false;
     this.id = this.router.snapshot.paramMap.get('id') ;
      //Kiểm tra id có đúng là int ko
      if(!this.regex.Interger.test(this.id)) this.validationService.getErrorRouterChange("Url can not  found");



      this.categoryService.getAll().then(Allcategory => {
        this.categoryService.getById(this.id).then(category=>{
          this.allCategory = Allcategory as Category[];
          this.allCategory=this.allCategory.filter(category=>category.id!=(+this.id));

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
    submit(){

      if(!this.validationService.checkFormGroupSubmit(this.formGroup)){
        this.validationService.getNotification(false,"Something wrong ");

        return ;
      }

this.isLoading=true;
    var a=  this.formGroup.value as Category;



    this.categoryService.update(this.categoryService.formData(a,this.fileData),this.id).then(success =>{
      this.validationService.getNotification(true,"Success created ");
      this.ngOnInit();
    }).catch(Error =>this.validationService.getNotification(false,Error.error)).finally(()=>{
      setTimeout(()=>{
        this.isLoading=false;
      },200)
    });


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
        .filter(item => item.categoryId=== parentId )
        .forEach(item => {
          options.push({ value: item.id, label: indent + item.categoryName });

          const children = this.buildOptions(items, item.id, indent + '--');
          options.push(...children);
        });

      return options;
    }
    delete(){
      if(!confirm('Are you sure you want to delete')) return ;
      alert("sdfsdf");
      this.isLoading = true;
      this.categoryService.delete(this.id+'').then(success => {
        this.validationService.getNotification(true,"Delete Success");
        this.ngOnInit();
      }).catch(error => {
        this.validationService.getNotification(false,error.error);
      }).finally(()=>{
        setTimeout(()=>{
        this.isLoading =false;
        },1000);
      });
    }
    enable(){
      if(!confirm('Are you sure you want to restore !')) return;
      this.isLoading = true;
      this.categoryService.enable(this.id+'').then(success => {

        this.validationService.getNotification(true,"Enable Success ^_^ !");



        this.ngOnInit();
      }).catch(error => {
        this.validationService.getNotification(false,error.error);
      }).finally(()=>{
        setTimeout(()=>{
        this.isLoading =false;
        },200);
      });

    }
}
