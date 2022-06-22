import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {CropperComponent} from "./cropper/cropper.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngx-photo-editor-app';

  constructor(
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    // this.render();
  }


  render() {
    this.viewContainerRef.clear();
    const cropperComponentComponentRef = this.viewContainerRef.createComponent(CropperComponent);
  }
}
