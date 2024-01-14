import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbrandsComponent } from './carbrands.component';

describe('CarbrandsComponent', () => {
  let component: CarbrandsComponent;
  let fixture: ComponentFixture<CarbrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarbrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
