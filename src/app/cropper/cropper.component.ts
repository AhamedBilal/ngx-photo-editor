import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import Cropper from 'cropperjs';
import ViewMode = Cropper.ViewMode;
import {CropperService} from "../service/cropper.service";

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements AfterViewInit {

  @ViewChild('image') image!: ElementRef;
  imgUrl = 'https://images.pexels.com/photos/12373451/pexels-photo-12373451.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';

  public cropper!: Cropper;
  public outputImage!: string;
  prevZoom = 0;

  @Input() modalTitle = 'Photo Editor';
  @Input() hideModalHeader = false;
  @Input() aspectRatio = 1;
  @Input() autoCropArea = 1;
  @Input() autoCrop = true;
  @Input() mask = true;
  @Input() guides = true;
  @Input() centerIndicator = true;
  @Input() viewMode: ViewMode = 0;
  @Input() modalWidth = '500px';
  @Input() modalCentered = false;
  @Input() scalable = true;
  @Input() zoomable = true;
  @Input() cropBoxMovable = true;
  @Input() cropBoxResizable = true;
  @Input() darkTheme = true;
  @Input() roundCropper = false;
  @Input() canvasHeight = 400;

  @Input() resizeToWidth: number | any;
  @Input() resizeToHeight: number | any;
  @Input() imageSmoothingEnabled = true;
  @Input() imageSmoothingQuality: ImageSmoothingQuality = 'high';
  url: string | any;
  format: string | any;
  quality = 92;

  isFormatDefined = false;

  @Output() closeEvent = new EventEmitter<CroppedEvent>();
  @Output() imageCropped = new EventEmitter<CroppedEvent>();
  imageLoaded = false;

  constructor(private service: CropperService) {
  }

  ngAfterViewInit(): void {

  }

  rotateRight() {
    this.cropper.rotate(45);
  }

  rotateLeft() {
    this.cropper.rotate(-45);
  }

  crop() {
    this.cropper.setDragMode('crop');
  }

  move() {
    this.cropper.setDragMode('move');
  }

  zoom(event: any) {
    const value = Number(event.target.value);
    this.cropper.zoom(value - this.prevZoom);
    this.prevZoom = value;
  }

  zoomIn() {
    this.cropper.zoom(0.1);
  }

  zoomOut() {
    this.cropper.zoom(-0.1);
  }

  flipH() {
    this.cropper.scaleX(-this.cropper.getImageData().scaleX);
  }

  flipV() {
    this.cropper.scaleY(-this.cropper.getImageData().scaleY);
  }

  reset() {
    this.cropper.reset();
  }

  export() {
    let cropedImage = this.cropper.getCroppedCanvas({
      width: this.resizeToWidth,
      height: this.resizeToHeight,
      imageSmoothingEnabled: this.imageSmoothingEnabled,
      imageSmoothingQuality: this.imageSmoothingQuality
    });

    if (!this.format) {

    }

    this.outputImage = cropedImage.toDataURL('image/' + this.format, this.quality);
    cropedImage.toBlob((blob: any) => {
      this.imageCropped.emit({
        base64: this.outputImage,
        file: new File([blob],
          Date.now() + '.' + this.format,
          {type: 'image/' + this.format})
      });
    }, 'image/' + this.format, this.quality / 100);
    this.imageLoaded = false;
  }


  close() {
    this.service.close();
  }

  onLoad() {
    this.image.nativeElement.addEventListener('ready', () => {
      this.imageLoaded = true;
    });

    this.cropper = new Cropper(this.image.nativeElement, {
      aspectRatio: this.aspectRatio,
      autoCropArea: this.autoCropArea,
      autoCrop: this.autoCrop,
      modal: this.mask, // black mask
      guides: this.guides, // grid
      center: this.centerIndicator, // center indicator
      viewMode: this.viewMode,
      scalable: this.scalable,
      zoomable: this.zoomable,
      background: false,
      cropBoxMovable: this.cropBoxMovable,
      cropBoxResizable: this.cropBoxResizable,
    });
  }
}

export interface CroppedEvent {
  base64?: string;
  file?: File;
}

export type imageFormat = 'gif' | 'jpeg' | 'tiff' | 'png' | 'webp' | 'bmp';

