import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: NgToastService) { }


  openWarning(WrngMsg:any){
    this.toast.warning({
      detail: WrngMsg,
      summary: '',
      duration: 2000,
      position:"topRight",
      sticky:true,
    })
  };

  openSuccess(successMsg:any){
    this.toast.success({
      detail:successMsg,
      duration: 2,
      sticky:true,
      position: 'topLeft'
    })
};

  openError(errorMsg: any){
    this.toast.error({
      detail: errorMsg,
      summary: 'Something Went wrong',
      duration: 2000,
      position:"topRight",
      sticky:true,
    })
  };

  openInfo(infoMsg:any){
    this.toast.info({
      detail:infoMsg,
      summary:'Please Check the Cart!',
      sticky:true,
      position: 'topLeft'
      })
  };

}
