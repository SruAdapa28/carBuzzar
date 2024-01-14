import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardfeaturegridComponent } from './cardfeaturegrid.component';

describe('CardfeaturegridComponent', () => {
  let component: CardfeaturegridComponent;
  let fixture: ComponentFixture<CardfeaturegridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardfeaturegridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardfeaturegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
