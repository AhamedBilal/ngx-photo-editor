import {ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {CropperComponent} from "../cropper/cropper.component";

@Injectable({
  providedIn: 'root'
})
export class CropperService {

  private cropperSubscriber!: Subject<any>;
  private cropperComponentRef!: ComponentRef<CropperComponent>;

  constructor(
    private viewContainerRef: ViewContainerRef
  ) {
  }

  open(): Observable<any> {
    this.viewContainerRef.clear();
    this.cropperComponentRef = this.viewContainerRef.createComponent(CropperComponent);
    return this.cropperSubscriber.asObservable();
  }

  close() {
    this.cropperSubscriber.complete();
    this.cropperComponentRef.destroy();
  }

  export(data: any) {
    this.cropperSubscriber.next(data);
    this.close();
  }

}
