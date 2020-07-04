import {Component} from '@angular/core';
import {CroppedEvent} from '../../projects/ngx-photo-editor/src/lib/ngx-photo-editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imageChangedEvent: any;

  constructor() {
  }

  // onImageCropped(event: CroppedEvent) {
  //   console.log(event);
  // }
  imgFile: any;
  imgUrl: any;

  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
    console.log(event.target.files[0])
    console.log(event.target.files[0].size / 1024);
  }

  imageCropped(event: CroppedEvent) {
    this.imgFile = event.base64;
    console.log(event);
    console.log(event.file.size / 1024);
  }
}
