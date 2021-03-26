import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestReliefComponent } from './request-relief.component';

describe('RequestReliefComponent', () => {
  let component: RequestReliefComponent;
  let fixture: ComponentFixture<RequestReliefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestReliefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestReliefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
