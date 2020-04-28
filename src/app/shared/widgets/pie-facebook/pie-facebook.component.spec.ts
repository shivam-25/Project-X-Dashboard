import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieFacebookComponent } from './pie-facebook.component';

describe('PieFacebookComponent', () => {
  let component: PieFacebookComponent;
  let fixture: ComponentFixture<PieFacebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieFacebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
