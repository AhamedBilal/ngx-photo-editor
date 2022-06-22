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
  imageUrl: any;

  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
  }


  imageCropped(event: CroppedEvent) {
    console.log(event);
    this.base64 = event.base64;
  }

  gotoGithub() {
    window.open('https://github.com/AhamedBilal/ngx-photo-editor');
  }

  // gotoNPM() {
  //   window.open('https://www.npmjs.com/package/ngx-photo-editor');
  // }
  crop() {
    this.imageUrl = 'https://images.pexels.com/photos/1231643/pexels-photo-1231643.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
  }
}
