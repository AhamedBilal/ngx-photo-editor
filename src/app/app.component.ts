import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {CropperComponent} from "./cropper/cropper.component";
import {CropperService} from "./service/cropper.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngx-photo-editor-app';

  constructor(
    private service: CropperService
  ) {
  }

  ngOnInit(): void {
  }


  open() {
    this.service.open();
  }
}
