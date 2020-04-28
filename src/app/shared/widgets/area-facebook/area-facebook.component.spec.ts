import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaFacebookComponent } from './area-facebook.component';

describe('AreaFacebookComponent', () => {
  let component: AreaFacebookComponent;
  let fixture: ComponentFixture<AreaFacebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaFacebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
