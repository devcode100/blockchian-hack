import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseHelpComponent } from './raise-help.component';

describe('RaiseHelpComponent', () => {
  let component: RaiseHelpComponent;
  let fixture: ComponentFixture<RaiseHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiseHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
