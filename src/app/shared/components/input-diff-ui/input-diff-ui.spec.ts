import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDiffUI } from './input-diff-ui';

describe('InputDiffUI', () => {
  let component: InputDiffUI;
  let fixture: ComponentFixture<InputDiffUI>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDiffUI]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputDiffUI);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
