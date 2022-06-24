import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import Cropper from "cropperjs";
import ViewMode = Cropper.ViewMode;

@Component({
  selector: 'lib-ngx-photo-editor',
  templateUrl: './ngx-photo-editor.component.html',
})
export class NgxPhotoEditorComponent implements OnDestroy {

  @ViewChild('image') image!: ElementRef;

  private cropper!: Cropper;
  public imgUrl!: string;
  private FILES_REGEX = /\.(gif|jpe?g|tiff|png|webp|bmp)$/i;


  @Input() modalTitle = 'Photo Editor';
  @Input() hideModalHeader = false;
  @Input() aspectRatio = NaN;
  @Input() autoCropArea = 0.8;
  @Input() autoCrop = true;
  @Input() mask = true;
  @Input() guides = true;
  @Input() centerIndicator = true;
  @Input() viewMode: ViewMode = 0;
  @Input() modalMaxWidth = '500px';
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
  @Input() format: string | any;

  @Input() closeBtnText = 'Close';
  @Input() applyBtnText = 'Apply';

  quality = 92;

  @Input() set imageQuality(value: number) {
    if (value > 0 && value <= 100) {
      this.quality = value;
    } else {
      this.errorEvent.error('Invalid image quality');
    }
  }

  @Output() closeEvent = new EventEmitter<any>();
  @Output() imageCroppedEvent = new EventEmitter<NgxCroppedEvent>();
  @Output() errorEvent = new EventEmitter<any>();
  imageLoaded = false;
  isProcessing = false;


  @Input() set source(data: File | string | any) {
    if (data instanceof Event) {
      // @ts-ignore
      const file = (<HTMLInputElement>data.target).files[0];
      if (this.FILES_REGEX.test(file.name)) {
        if (!this.format) {
          // @ts-ignore
          this.format = data.target.files[0].type.split('/')[1];
        }
        const reader = new FileReader();
        reader.onload = (ev: any) => {
          this.imgUrl = ev.target.result;
        };
        // @ts-ignore
        reader.readAsDataURL(data.target.files[0]);
      } else {
        console.log('error');
        this.errorEvent.emit('Not supported INPUT');
      }
    } else if (data instanceof File) {
      if (this.FILES_REGEX.test(data.name)) {
        if (!this.format) {
          this.format = data.type.split('/')[1];
        }
        const reader = new FileReader();
        reader.onload = (ev: any) => {
          this.imgUrl = ev.target.result;
        };
        reader.readAsDataURL(data);
      } else {
        this.errorEvent.emit('Not supported INPUT');
      }
    } else if (typeof data === 'string') {
      if ((/^data:image\/([a-zA-Z]*);base64,([^\"]*)$/).test(data)) {
        this.imgUrl = data;
        if (!this.format) {
          this.format = ((data.split(',')[0]).split(';')[0]).split(':')[1].split('/')[1];
        }
      } else if (this.isValidImageURL(data)) {
        this.imgUrl = data;
        if (!this.format) {
          // @ts-ignore
          this.format = data.split(/[#?]/)[0].split('.').pop().trim();
        }
      } else {
        this.errorEvent.emit('Not supported URL');
      }
    } else {
      this.errorEvent.emit('Not supported INPUT');
    }
  }

  isValidImageURL(str: string) {
    return str.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?(\#(.*))?$/gim);
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
    this.isProcessing = true;
    this.imageLoaded = false;
    let cropedImage = this.cropper.getCroppedCanvas({
      width: this.resizeToWidth,
      height: this.resizeToHeight,
      imageSmoothingEnabled: this.imageSmoothingEnabled,
      imageSmoothingQuality: this.imageSmoothingQuality
    });

    const outputImage = cropedImage.toDataURL('image/' + this.format, this.quality);
    cropedImage.toBlob((blob: any) => {
      this.imageCroppedEvent.emit({
        base64: outputImage,
        file: new File([blob],
          Date.now() + '.' + this.format,
          {type: 'image/' + this.format})
      });
      this.isProcessing = false;
      this.imageLoaded = true;
    }, 'image/' + this.format, this.quality / 100);
  }


  close() {
    this.closeEvent.emit();
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

  ngOnDestroy(): void {
    console.log('destroyed');
  }

  error() {
    this.errorEvent.emit('Error loading image');
  }
}

export interface NgxCroppedEvent {
  base64?: string;
  file?: File;
}

export type imageFormat = 'gif' | 'jpeg' | 'tiff' | 'png' | 'webp' | 'bmp';
