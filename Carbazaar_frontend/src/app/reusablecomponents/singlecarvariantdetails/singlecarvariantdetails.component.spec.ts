import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglecarvariantdetailsComponent } from './singlecarvariantdetails.component';

describe('SinglecarvariantdetailsComponent', () => {
  let component: SinglecarvariantdetailsComponent;
  let fixture: ComponentFixture<SinglecarvariantdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglecarvariantdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglecarvariantdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
