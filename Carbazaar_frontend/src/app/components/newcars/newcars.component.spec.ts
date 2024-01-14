import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcarsComponent } from './newcars.component';

describe('NewcarsComponent', () => {
  let component: NewcarsComponent;
  let fixture: ComponentFixture<NewcarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
