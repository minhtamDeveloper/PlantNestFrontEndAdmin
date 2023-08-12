import { Component, OnInit ,} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Category } from "src/app/model/category.model";
import { Product } from "src/app/model/product.model";
import { SelectDeQuy } from "src/app/model/selectDeQuy.model";
import { Supplier123 } from "src/app/model/supplier123.model";
import { CategoryService } from "src/app/service/categoty.service";
import { Product123Service } from "src/app/service/product123.service";
import { ValidatorData } from "src/app/service/validatorData.service";

@Component({
    selector:'app-root',
    templateUrl:'./productadd.component.html',

})

//interface laf implements
export class ProductAddComponent implements OnInit{
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
  constructor(
    private router: Router,
      private categoryService: CategoryService,
      public validationService :ValidatorData,
      private product123Service: Product123Service


  ){}
  ngOnInit(): void {
      this.checkFileIndex=true;
      this.checkFileListFile=true;
      this.dataAllCategory=[];
      this.isLoading=false;
      this.dataAllSupplier=[];
      this.selectedFileUrlIndex='';
      this.submitListFile=[];
      this.submitFileIndex =null;
      this.categoryService.getAll().then(dataCategory => {
        this.product123Service.getAllSuplier().then(dataSupplier=>{
          this.dataAllCategory = dataCategory as Category[];
          this.dataAllSupplier = dataSupplier as Supplier123[];
          this.optionCategory = this.categoryService.buildOptions(this.dataAllCategory);



          this.formGroup = this.product123Service.getFormGroup();
        }).catch(error => {
          this.validationService.getNotification(false,"Can not load Data");
        });
      }).catch(error => {
        this.validationService.getNotification(false,"Can not load Data!")
      });
  }
  submit(){
    this.checkFileIndex=this.submitFileIndex!=null;
    this.checkFileListFile=(this.submitListFile.length>0);

      if(!this.validationService.checkFormGroupSubmit(this.formGroup)){
        this.validationService.getNotification(false,"Some Thing Wrong 1!");
        return ;
      }

      if(!this.checkFileIndex && this.checkFileListFile) {
        this.validationService.getNotification(false,"Some Thing Wrong 2!");
        return ;
      }
     this.isLoading=true;
    var a = this.formGroup.value as Product;
    console.log(a);
    this.product123Service.create(this.product123Service.formData(a,this.submitFileIndex,this.submitListFile)).then(success => {
        this.validationService.getNotification(true,"Create Success!");
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
