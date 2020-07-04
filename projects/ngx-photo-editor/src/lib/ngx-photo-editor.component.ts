import {Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import Cropper from 'cropperjs';
import ViewMode = Cropper.ViewMode;
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-photo-editor',
  templateUrl: './ngx-photo-editor.component.html',
  styleUrls: ['./ngx-photo-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NgxPhotoEditorComponent {

  @ViewChild('content', {static: false}) content;

  public cropper: Cropper;
  public outputImage: string;
  prevZoom = 0;

  @Input() modalTitle = 'Photo Editor';
  @Input() aspectRatio = 1;
  @Input() autoCropArea = 1;
  @Input() autoCrop = true;
  @Input() mask = true;
  @Input() guides = true;
  @Input() centerIndicator = true;
  @Input() viewMode: ViewMode = 0;
  @Input() modalSize: string;
  @Input() modalCentered = false;
  @Input() scalable = true;
  @Input() zoomable = true;
  @Input() cropBoxMovable = true;
  @Input() cropBoxResizable = true;
  @Input() darkTheme = true;
  @Input() roundCropper = false;
  @Input() canvasHeight = 400;

  @Input() resizeToWidth: number;
  @Input() resizeToHeight: number;
  @Input() imageSmoothingEnabled = true;
  @Input() imageSmoothingQuality: ImageSmoothingQuality = 'high';
  url: string;
  lastUpdate = Date.now();

  format = 'png';
  quality = 92;

  @Output() imageCropped = new EventEmitter();

  constructor(private modalService: NgbModal) {
  }

  @Input() set imageQuality(value: number) {
    if (value > 0 && value <= 100) {
      this.quality = value;
    }
  }

  @Input() set imageFormat(type: string) {
    if ((/^(gif|jpe?g|tiff|png|webp|bmp)$/i).test(type)) {
      this.format = type;
    }
  }

  @Input() set imageUrl(url: string) {
    if (url) {
      this.url = url;
      if (this.lastUpdate !== Date.now()) {
        this.open();
        this.lastUpdate = Date.now();
      }
    }
  }

  @Input() set imageBase64(base64: string) {
    if (base64 && (/^data:image\/([a-zA-Z]*);base64,([^\"]*)$/).test(base64)) {
      this.imageUrl = base64;
      this.imageFormat = ((base64.split(',')[0]).split(';')[0]).split(':')[1].split('/')[1];
    }
  }

  @Input() set imageChanedEvent(event: any) {
    if (event) {
      const file = event.target.files[0];
      if (file && (/\.(gif|jpe?g|tiff|png|webp|bmp)$/i).test(file.name)) {
        this.imageFormat = event.target.files[0].type.split('/')[1];
        const reader = new FileReader();
        reader.onload = (ev: any) => {
          this.imageUrl = ev.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  @Input() set imageFile(file: File) {
    if (file && (/\.(gif|jpe?g|tiff|png|webp|bmp)$/i).test(file.name)) {
      this.imageFormat = file.type.split('/')[1];
      const reader = new FileReader();
      reader.onload = (ev: any) => {
        this.imageUrl = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onImageLoad(image) {

    image.addEventListener('ready', () => {
      if (this.roundCropper) {
        (document.getElementsByClassName('cropper-view-box')[0] as HTMLElement).style.borderRadius = '50%';
        (document.getElementsByClassName('cropper-face')[0] as HTMLElement).style.borderRadius = '50%';
      }
    });

    this.cropper = new Cropper(image, {
      aspectRatio: this.aspectRatio,
      autoCropArea: this.autoCropArea,
      autoCrop: this.autoCrop,
      modal: this.mask, // black mask
      guides: this.guides, // grid
      center: this.centerIndicator, // center indicator
      viewMode: this.viewMode,
      scalable: this.scalable,
      zoomable: this.zoomable,
      cropBoxMovable: this.cropBoxMovable,
      cropBoxResizable: this.cropBoxResizable,
    });
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

  zoom(event) {
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
    let cropedImage;
    if (this.resizeToWidth && this.resizeToHeight) {
      cropedImage = this.cropper.getCroppedCanvas({
        width: this.resizeToWidth,
        minWidth: 256,
        minHeight: 256,
        maxWidth: 4096,
        maxHeight: 4096,
        imageSmoothingEnabled: this.imageSmoothingEnabled,
        imageSmoothingQuality: this.imageSmoothingQuality
      });
    } else if (this.resizeToHeight) {
      cropedImage = this.cropper.getCroppedCanvas({
        height: this.resizeToHeight,
        minWidth: 256,
        minHeight: 256,
        maxWidth: 4096,
        maxHeight: 4096,
        imageSmoothingEnabled: this.imageSmoothingEnabled,
        imageSmoothingQuality: this.imageSmoothingQuality
      });
    } else if (this.resizeToWidth) {
      cropedImage = this.cropper.getCroppedCanvas({
        width: this.resizeToWidth,
        minWidth: 256,
        minHeight: 256,
        maxWidth: 4096,
        maxHeight: 4096,
        imageSmoothingEnabled: this.imageSmoothingEnabled,
        imageSmoothingQuality: this.imageSmoothingQuality
      });
    } else {
      cropedImage = this.cropper.getCroppedCanvas({
        minWidth: 256,
        minHeight: 256,
        maxWidth: 4096,
        maxHeight: 4096,
        imageSmoothingEnabled: this.imageSmoothingEnabled,
        imageSmoothingQuality: this.imageSmoothingQuality
      });
    }
    this.outputImage = cropedImage.toDataURL('image/' + this.format, this.quality);
    cropedImage.toBlob(blob => {
      this.imageCropped.emit({
        base64: this.outputImage,
        file: new File([blob], Date.now() + '.' + this.format, {type: 'image/' + this.format})
      });
    }, 'image/' + this.format, this.quality / 100);
  }

  open() {
    this.modalService.dismissAll();
    this.modalService.open(this.content, {size: this.modalSize, centered: this.modalCentered, backdrop: 'static'});
  }
}

export interface CroppedEvent {
  base64?: string;
  file?: File;
}
