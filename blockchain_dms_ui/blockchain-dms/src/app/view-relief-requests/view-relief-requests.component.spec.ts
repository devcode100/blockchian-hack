import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReliefRequestsComponent } from './view-relief-requests.component';

describe('ViewReliefRequestsComponent', () => {
  let component: ViewReliefRequestsComponent;
  let fixture: ComponentFixture<ViewReliefRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReliefRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReliefRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
