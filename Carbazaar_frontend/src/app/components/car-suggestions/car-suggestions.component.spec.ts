import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSuggestionsComponent } from './car-suggestions.component';

describe('CarSuggestionsComponent', () => {
  let component: CarSuggestionsComponent;
  let fixture: ComponentFixture<CarSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarSuggestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
