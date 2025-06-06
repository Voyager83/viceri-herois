import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementDialog } from './element-dialog';

describe('ElementDialog', () => {
  let component: ElementDialog;
  let fixture: ComponentFixture<ElementDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
