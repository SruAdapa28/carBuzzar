import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardgriditemComponent } from './cardgriditem.component';

describe('CardgriditemComponent', () => {
  let component: CardgriditemComponent;
  let fixture: ComponentFixture<CardgriditemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardgriditemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardgriditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
