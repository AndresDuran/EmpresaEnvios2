import { Injectable } from '@angular/core';
import { NgProgressRef } from 'ngx-progressbar';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  progressRef: NgProgressRef;


  default:string = "#FFFFFF";
  currentColor: string = this.default;
  constructor() {}

  
    startLoading() {
      this.currentColor = this.default;
      this.progressRef.start();
     
    }
  inc(){
    this.progressRef.inc(100);
  }
  set(){
    this.progressRef.set(45);
  }
    completeLoading() {
      this.currentColor = this.default;
      this.progressRef.complete();
     
    }
    
}
