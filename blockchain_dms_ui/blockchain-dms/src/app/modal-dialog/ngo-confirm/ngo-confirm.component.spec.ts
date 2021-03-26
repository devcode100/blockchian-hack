import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoConfirmComponent } from './ngo-confirm.component';

describe('NgoConfirmComponent', () => {
  let component: NgoConfirmComponent;
  let fixture: ComponentFixture<NgoConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgoConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgoConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
