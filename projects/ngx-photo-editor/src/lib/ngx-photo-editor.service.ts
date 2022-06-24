import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';
import {Observable, Subject} from "rxjs";
import ViewMode = Cropper.ViewMode;
import {NgxCroppedEvent, NgxPhotoEditorComponent} from "./ngx-photo-editor.component";
import CropperEvent = Cropper.CropperEvent;

@Injectable({
  providedIn: 'root'
})
export class NgxPhotoEditorService {

  private ngxPESubscriber!: Subject<any>;
  private ngxPEComponentRef!: ComponentRef<NgxPhotoEditorComponent>;


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) {
  }

  open(source: Event | string | File | any, options?: Options): Observable<NgxCroppedEvent> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NgxPhotoEditorComponent);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    this.ngxPESubscriber = new Subject<string>();
    this.ngxPEComponentRef = componentRef;
    this.ngxPEComponentRef.instance.closeEvent.subscribe(() => this.close());
    this.ngxPEComponentRef.instance.errorEvent.subscribe((data) => this.errorHandler(data));
    this.ngxPEComponentRef.instance.imageCroppedEvent.subscribe((data) => this.export(data));
    if (options) {
      Object.keys(options).map(value => {
        // @ts-ignore
        this.ngxPEComponentRef.instance[value] = options[value];
      })
    }
    this.ngxPEComponentRef.instance.source = source;
    return this.ngxPESubscriber.asObservable();
  }

  private errorHandler(data: any) {
    this.ngxPESubscriber.error(data);
    this.close();
  }

  private close() {
    this.ngxPESubscriber.complete();
    this.ngxPEComponentRef.destroy();
  }

  private export(data: any) {
    this.ngxPESubscriber.next(data);
    this.close();
  }

}

export interface Options {
  aspectRatio?: number | any;
  modalTitle?: string;
  hideModalHeader?: boolean;
  autoCropArea?: number;
  autoCrop?: boolean;
  mask?: boolean;
  guides?: boolean;
  centerIndicator?: boolean;
  viewMode?: ViewMode;
  modalMaxWidth?: string;
  scalable?: boolean;
  zoomable?: boolean;
  cropBoxMovable?: boolean;
  cropBoxResizable?: boolean;
  roundCropper?: boolean;
  resizeToWidth?: number | any;
  resizeToHeight?: number | any;
  imageSmoothingEnabled?: boolean;
  imageSmoothingQuality?: ImageSmoothingQuality;
  format?: string | any;
  imageQuality?: number;
  applyBtnText?: string;
  closeBtnText?: string;
}
