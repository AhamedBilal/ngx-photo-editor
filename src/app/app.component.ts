import {Component} from '@angular/core';
import {CroppedEvent} from 'ngx-photo-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  base64: any;
  imageChangedEvent: any;
  imageUrl = null;


  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
  }


  imageCropped(event: CroppedEvent) {
    this.base64 = event.base64;
  }

  gotoGithub() {
    window.open('https://github.com/AhamedBilal/ngx-photo-editor');
  }

}
