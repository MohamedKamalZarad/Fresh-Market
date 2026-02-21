import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Searchresaults } from './searchresaults';

describe('Searchresaults', () => {
  let component: Searchresaults;
  let fixture: ComponentFixture<Searchresaults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Searchresaults]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Searchresaults);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
