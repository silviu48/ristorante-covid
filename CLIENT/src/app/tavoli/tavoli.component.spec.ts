import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TavoliComponent } from './tavoli.component';

describe('TavoliComponent', () => {
  let component: TavoliComponent;
  let fixture: ComponentFixture<TavoliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TavoliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TavoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
