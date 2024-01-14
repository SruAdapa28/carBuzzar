import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerCompareComponent } from './dealer-compare.component';

describe('DealerCompareComponent', () => {
  let component: DealerCompareComponent;
  let fixture: ComponentFixture<DealerCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
