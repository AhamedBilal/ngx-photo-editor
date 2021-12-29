import {NgModule} from '@angular/core';
import {NgxPhotoEditorComponent} from './ngx-photo-editor.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [NgxPhotoEditorComponent],
    imports: [NgbModalModule, CommonModule],
  exports: [NgxPhotoEditorComponent],
})
export class NgxPhotoEditorModule {
}
