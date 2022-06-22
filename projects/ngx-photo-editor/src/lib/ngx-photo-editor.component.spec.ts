import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPhotoEditorComponent } from './ngx-photo-editor.component';

describe('NgxPhotoEditorComponent', () => {
  let component: NgxPhotoEditorComponent;
  let fixture: ComponentFixture<NgxPhotoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxPhotoEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxPhotoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
