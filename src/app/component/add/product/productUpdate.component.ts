import { Component, OnInit ,} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Category } from "src/app/model/category.model";
import { Product } from "src/app/model/product.model";
import { SelectDeQuy } from "src/app/model/selectDeQuy.model";
import { Supplier123 } from "src/app/model/supplier123.model";
import { BaseURLService } from "src/app/service/baseurl.service";
import { CategoryService } from "src/app/service/categoty.service";
import { Product123Service } from "src/app/service/product123.service";
import { RegexApi } from "src/app/service/regex.service";
import { ValidatorData } from "src/app/service/validatorData.service";

@Component({
    selector: 'product_update',
    templateUrl:'./productUpdate.component.html',

})

//interface laf implements
export class ProductUpdateComponent implements OnInit{
  isLoading:boolean=false;
  activeBouquet!: string;
  dataAllCategory:Category[];
  formGroup:FormGroup;
  dataAllSupplier:Supplier123[];
  optionCategory:SelectDeQuy[];
  //Xử lý file
  submitListFile:File[];
  checkFileListFile:boolean;
  selectedFileUrlSide:string[];
  //file index ;
  submitFileIndex:File;
  checkFileIndex:boolean;
  selectedFileUrlIndex:string;
  dataProduct:Product;
  id:string;
  constructor(
    private router: Router,
      private categoryService: CategoryService,
      public validationService :ValidatorData,
      private product123Service: Product123Service,
      private regex : RegexApi,
      private baseUrl:BaseURLService,


  ){}
  ngOnInit(): void {
    this.id='';
    this.id='4';


     // this.id = this.router.snapshot.paramMap.get('id') ;
      //Kiểm tra id có đúng là int ko
      if(!this.regex.Interger.test(this.id)) this.validationService.getErrorRouterChange("Url can not  found");
    /////
      this.checkFileIndex=true;
      this.checkFileListFile=true;
      this.dataAllCategory=[];
      this.isLoading=false;
      this.dataAllSupplier=[];
      this.selectedFileUrlIndex='';
      this.submitListFile=[];
      this.submitFileIndex =null;


    this.product123Service.getByIdUpdate(this.id).then(dataProduct=>{
      this.categoryService.getAll().then(dataCategory => {
        this.product123Service.getAllSuplier().then(dataSupplier=>{

          this.dataProduct = dataProduct as Product;
          this.dataAllCategory = dataCategory as Category[];
          this.dataAllSupplier = dataSupplier as Supplier123[];
          this.optionCategory = this.categoryService.buildOptions(this.dataAllCategory);
            //Thả ảnh vô
          this.selectedFileUrlIndex = this.dataProduct.images.filter(header => header.imageUrl.includes('index'))[0].imageUrl;
          this.selectedFileUrlIndex = (this.selectedFileUrlIndex!=null && this.selectedFileUrlIndex!='')?this.baseUrl.getBase()+this.selectedFileUrlIndex:'';

          this.selectedFileUrlSide=[];
          this.dataProduct.images.filter(header => !header.imageUrl.includes('index')).forEach(header => this.selectedFileUrlSide.push(this.baseUrl.getBase()+header.imageUrl));

          this.formGroup = this.product123Service.getFormGroup(this.dataProduct);
        }).catch(error => {
          this.validationService.getNotification(false,"Can not load Data");
        });
      }).catch(error => {
        this.validationService.getNotification(false,"Can not load Data!")
      });
    }).catch(error=>{
      this.validationService.getNotification(false,"Can not load Data!")

    });


  }
  submit(){


      if(!this.validationService.checkFormGroupSubmit(this.formGroup)){
        this.validationService.getNotification(false,"Some Thing Wrong 1!");
        return ;
      }


     this.isLoading=true;
    var a = this.formGroup.value as Product;

    this.product123Service.update(this.product123Service.formData(a,this.submitFileIndex,this.submitListFile),this.id).then(success => {
        this.validationService.getNotification(true,"Update Success!");
    }).catch(error => {
      this.validationService.getNotification(false,error.error);
    }).finally(()=>{
        setTimeout(() => {
              this.isLoading = false;
        }, 300);
    });
  }
  handleFileSelect(event: any) {

    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.submitFileIndex = fileList[0];
      const fileReader: FileReader = new FileReader();

      fileReader.addEventListener('load', () => {
        this.selectedFileUrlIndex = fileReader.result as string;
      });

      fileReader.readAsDataURL(this.submitFileIndex);
    } else {
      this.selectedFileUrlIndex = '';
    }
  }
  //Lấy ảnh bên side
  handleFileSelectSide(event: any) {

    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const ListMet :File[]=[];
      const ListUrlString:string[]=[];
      this.submitListFile=[];
      this.selectedFileUrlSide=[];
      for (let index = 0; index < fileList.length; index++) {
        if(index>=3) break;
        ListMet.push(fileList[index]);
        const fileReader: FileReader = new FileReader();

        fileReader.addEventListener('load', () => {
          ListUrlString.push(fileReader.result as string);
        });

        fileReader.readAsDataURL(ListMet[index]);
      }

      this.submitListFile=ListMet;
      this.selectedFileUrlSide=ListUrlString;


    } else {
      this.selectedFileUrlIndex = '';
    }
  }


}
