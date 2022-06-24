import {Component} from '@angular/core';
import {NgxCroppedEvent, NgxPhotoEditorService} from "ngx-photo-editor";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  output?: NgxCroppedEvent;

  constructor(private service: NgxPhotoEditorService) {}

  fileChangeHandler($event: any) {
    this.service.open('https://images.pexels.com/photos/7913028/pexels-photo-7913028.jpeg#gfgfgf', {
      aspectRatio: 4 / 3,
      autoCropArea: 1
    }).subscribe(value => {
      this.output = value;
    });
  }

  download() {
    const link = document.createElement('a');
    // @ts-ignore
    link.download = this.output.file?.name;
    // @ts-ignore
    link.href = URL.createObjectURL(this.output.file);
    link.click();
  }

  gotoGithub() {
    window.open('https://github.com/AhamedBilal/ngx-photo-editor');
  }
}
