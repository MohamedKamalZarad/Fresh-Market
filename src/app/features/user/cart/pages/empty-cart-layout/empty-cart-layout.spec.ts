import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyCartLayout } from './empty-cart-layout';

describe('EmptyCartLayout', () => {
  let component: EmptyCartLayout;
  let fixture: ComponentFixture<EmptyCartLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyCartLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyCartLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
