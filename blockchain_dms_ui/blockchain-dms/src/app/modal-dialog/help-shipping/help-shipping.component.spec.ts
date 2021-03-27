import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpShippingComponent } from './help-shipping.component';

describe('HelpShippingComponent', () => {
  let component: HelpShippingComponent;
  let fixture: ComponentFixture<HelpShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpShippingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
