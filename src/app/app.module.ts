import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPhotoEditorModule} from '../../projects/ngx-photo-editor/src/lib/ngx-photo-editor.module';

import {MatButtonModule, MatButtonToggleModule, MatIconModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
// import {NgxPhotoEditorModule} from 'ngx-photo-editor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPhotoEditorModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
