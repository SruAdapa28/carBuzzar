import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCompareComponent } from './car-compare.component';

describe('CarCompareComponent', () => {
  let component: CarCompareComponent;
  let fixture: ComponentFixture<CarCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
