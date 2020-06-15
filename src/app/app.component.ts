import {Component, OnInit} from '@angular/core';
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

  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: CroppedEvent) {
    console.log(event);
  }
}
