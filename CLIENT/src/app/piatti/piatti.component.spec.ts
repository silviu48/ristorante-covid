import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiattiComponent } from './piatti.component';

describe('PiattiComponent', () => {
  let component: PiattiComponent;
  let fixture: ComponentFixture<PiattiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiattiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
