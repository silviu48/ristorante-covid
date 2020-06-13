import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensaComponent } from './dispensa.component';

describe('DispensaComponent', () => {
  let component: DispensaComponent;
  let fixture: ComponentFixture<DispensaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
