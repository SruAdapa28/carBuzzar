import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcarbodyComponent } from './newcarbody.component';

describe('NewcarbodyComponent', () => {
  let component: NewcarbodyComponent;
  let fixture: ComponentFixture<NewcarbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcarbodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcarbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
