import { TestBed } from '@angular/core/testing';

import { CropperService } from './cropper.service';

describe('CropperService', () => {
  let service: CropperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
