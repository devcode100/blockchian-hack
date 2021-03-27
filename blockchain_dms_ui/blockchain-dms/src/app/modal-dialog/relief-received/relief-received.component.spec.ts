import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReliefReceivedComponent } from './relief-received.component';

describe('ReliefReceivedComponent', () => {
  let component: ReliefReceivedComponent;
  let fixture: ComponentFixture<ReliefReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReliefReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReliefReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
