import {NgModule} from '@angular/core';
import {NgxPhotoEditorComponent} from './ngx-photo-editor.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [NgxPhotoEditorComponent],
  imports: [
    NgbModalModule
  ],
  exports: [NgxPhotoEditorComponent]
})
export class NgxPhotoEditorModule {
}
