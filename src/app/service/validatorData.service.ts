import { Injectable } from "@angular/core";
import { FormGroup, ValidatorFn } from "@angular/forms";
import { Router } from "@angular/router";
@Injectable()
export class ValidatorData{


    public readonly Required:string='required';
    public  readonly MinLength: string = 'minLength';
  public  readonly MaxLength: string = 'maxLength';
  public  readonly Pattern: string = 'pattern';
  public  readonly Email: string = 'email';
  public  readonly MatchPasswords: string = 'matchPasswords';
  public  readonly DateConvert:string ='dd/MM/yyyy';
  public  readonly DateConvertString:string ='';
  constructor(private route: Router){

  }
  //fieldName là tên data,fileReality là tên bên ngoài hiện ra của nó , stringPattern là trường hợp regex pattern có lỗi thì bắt
  getErrorText(fieldName: string,filedReality:string , formGroup: FormGroup,dictionary?:Record<string,number>){
    const field = formGroup.get(fieldName);
   dictionary = dictionary as Record<string,number>;
  if (field.touched && field.invalid) {
    if (field.hasError('required')) {

      //const myDictionary: Record<string, number> = { 'key1': 1, 'key2': 2 };
      //console.log(myDictionary['key1']+'');
      return `${filedReality} is required.`;
    } else if (field.hasError('maxlength')) {
      const maxLength = field.getError('maxlength').requiredLength;
      return `${filedReality} must be at most ${maxLength} characters long.`;
    } else if (field.hasError('minlength')) {
      const minLength = field.getError('minlength').requiredLength;
      return `${filedReality} must be at least ${minLength} characters long.`;
    } else if (field.hasError('email')) {
      return `${filedReality} must be a valid email address.`;
    } else if (field.hasError('max')) {
      const maxValue = field.getError('max').max;
      return `${filedReality} must be less than or equal to ${maxValue}.`;
    } else if (field.hasError('min')) {
      const minValue = field.getError('min').min;
      return `${filedReality} must be greater than or equal to ${minValue}.`;
    } else if (field.hasError('pattern')) {
      // if(stringPattern!=null){
      //   return stringPattern;
      // }
      const patternValue = field.getError('pattern').requiredPattern;
      return `${filedReality} must match the pattern ${patternValue}.`;
    } else if (field.hasError('matchPasswords')) {
      return `Confirm ${filedReality} must match ${filedReality}.`;
    }
  }

  return '';
  }
 //kiểm tra tính hợp lệ của trường thuộc tính để add class chứ gì
  getErrorAddClass(fieldName: string, formGroup: FormGroup): boolean{
    const field = formGroup.get(fieldName);
    return field.invalid && (field.dirty || field.touched)
   // formGroup.get('class').invalid && (formGroup.get('class').dirty || formGroup.get('class').touched)
   // field.invalid && (field.dirty || field.touched)
  }
  //các vấn đề cần kiểm tra formGroup trc khi submit
  checkFormGroupSubmit(formGroup: FormGroup): boolean{
    for (const field in formGroup.controls) {
      const control = formGroup.get(field);
      if(!control.disabled){
        control.markAsDirty();
        control.markAsTouched();
      }

    }
     return  formGroup.valid;
  }

  getNotification(status:boolean,mess:string ,id?:string ){
    if(status){
      alert(mess);
    }else{

      alert(mess);

    }

  }
  getErrorRouterChange(mess:string ,error?:any ,urlChange?:string ,urlNow?:string ){
    // this.route.navigateByUrl('/error', { skipLocationChange: true });
    // if(!(mess==null|| mess =='')){
    //   setTimeout(() =>{
    //     alert(mess);
    //   },500);
    // }



  }
  getRouterChange(url:string,mess?:string){
      // try {
      //   this.route.navigateByUrl(url, { skipLocationChange: true });

      // } catch (error) {
      //   this.route.navigateByUrl('/error', { skipLocationChange: true });
      // }
  }
   matchPasswordsValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (formGroup: FormGroup): { [key: string]: any } | null => {
      const password = formGroup.get(passwordKey).value;
      const confirmPassword = formGroup.get(confirmPasswordKey).value;
      if (password !== confirmPassword) {
        formGroup.get(confirmPasswordKey).setErrors({ matchPasswords: true });
        return { matchPasswords: true };
      } else {
        formGroup.get(confirmPasswordKey).setErrors(null);
        return null;
      }
    };
  }




}



