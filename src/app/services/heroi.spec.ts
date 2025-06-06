import { TestBed } from '@angular/core/testing';

import { Heroi } from './heroi';

describe('Heroi', () => {
  let service: Heroi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Heroi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
