import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePayment } from './online-payment';

describe('OnlinePayment', () => {
  let component: OnlinePayment;
  let fixture: ComponentFixture<OnlinePayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlinePayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlinePayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
