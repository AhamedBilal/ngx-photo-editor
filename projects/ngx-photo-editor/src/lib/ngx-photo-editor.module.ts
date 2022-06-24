import {NgModule} from '@angular/core';
import {NgxPhotoEditorComponent} from './ngx-photo-editor.component';
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [
    NgxPhotoEditorComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    NgxPhotoEditorComponent
  ]
})
export class NgxPhotoEditorModule {
}
