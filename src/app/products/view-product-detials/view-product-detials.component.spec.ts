import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductDetialsComponent } from './view-product-detials.component';

describe('ViewProductDetialsComponent', () => {
  let component: ViewProductDetialsComponent;
  let fixture: ComponentFixture<ViewProductDetialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProductDetialsComponent]
    });
    fixture = TestBed.createComponent(ViewProductDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
