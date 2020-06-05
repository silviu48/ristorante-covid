import { TestBed } from '@angular/core/testing';

import { AjaxRequestsService } from './ajax-requests.service';

describe('AjaxRequestsService', () => {
  let service: AjaxRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjaxRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
