import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarfeaturelistComponent } from './carfeaturelist.component';

describe('CarfeaturelistComponent', () => {
  let component: CarfeaturelistComponent;
  let fixture: ComponentFixture<CarfeaturelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarfeaturelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarfeaturelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
