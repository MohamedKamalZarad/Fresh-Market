import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResaults } from './search-resaults';

describe('SearchResaults', () => {
  let component: SearchResaults;
  let fixture: ComponentFixture<SearchResaults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResaults]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResaults);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
