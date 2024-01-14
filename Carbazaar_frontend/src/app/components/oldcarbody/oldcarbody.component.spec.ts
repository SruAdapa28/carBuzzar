import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldcarbodyComponent } from './oldcarbody.component';

describe('OldcarbodyComponent', () => {
  let component: OldcarbodyComponent;
  let fixture: ComponentFixture<OldcarbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldcarbodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldcarbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
