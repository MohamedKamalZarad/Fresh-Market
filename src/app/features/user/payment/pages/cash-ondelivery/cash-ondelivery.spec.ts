import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashOndelivery } from './cash-ondelivery';

describe('CashOndelivery', () => {
  let component: CashOndelivery;
  let fixture: ComponentFixture<CashOndelivery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashOndelivery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashOndelivery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
