import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef, EmbeddedViewRef,
  Injectable,
  Injector,
  ViewContainerRef
} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {CropperComponent} from "../cropper/cropper.component";

@Injectable({
  providedIn: 'root'
})
export class CropperService {

  private cropperSubscriber!: Subject<any>;
  private cropperComponentRef!: ComponentRef<CropperComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
  }

  open(): Observable<any> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CropperComponent);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.cropperComponentRef = componentRef;
    this.cropperComponentRef.instance.closeEvent.subscribe(() => this.close());
    this.cropperComponentRef.instance.imageCropped.subscribe(this.export);
    this.cropperSubscriber = new Subject<string>();
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
