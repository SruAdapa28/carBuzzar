import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarFeaturesComponent } from './car-features.component';

describe('CarFeaturesComponent', () => {
  let component: CarFeaturesComponent;
  let fixture: ComponentFixture<CarFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
