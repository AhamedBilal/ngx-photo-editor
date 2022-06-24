import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {NgxPhotoEditorService} from "../../projects/ngx-photo-editor/src/lib/ngx-photo-editor.service";
import {NgxCroppedEvent} from "../../projects/ngx-photo-editor/src/lib/ngx-photo-editor.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  output: NgxCroppedEvent | any;

  constructor(private service: NgxPhotoEditorService) {
  }

  changeEvent($event: any) {
    this.service.open($event, {
      aspectRatio: null
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
