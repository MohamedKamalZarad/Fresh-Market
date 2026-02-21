import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressSettings } from './address-settings';

describe('AddressSettings', () => {
  let component: AddressSettings;
  let fixture: ComponentFixture<AddressSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
