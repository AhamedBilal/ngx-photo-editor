import { TestBed } from '@angular/core/testing';

import { NgxPhotoEditorService } from './ngx-photo-editor.service';

describe('NgxPhotoEditorService', () => {
  let service: NgxPhotoEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxPhotoEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
