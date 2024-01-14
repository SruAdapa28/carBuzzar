import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldcarsComponent } from './oldcars.component';

describe('OldcarsComponent', () => {
  let component: OldcarsComponent;
  let fixture: ComponentFixture<OldcarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldcarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldcarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
