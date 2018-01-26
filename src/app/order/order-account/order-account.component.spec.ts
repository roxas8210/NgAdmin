import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAccountComponent } from './order-account.component';

describe('OrderAccountComponent', () => {
  let component: OrderAccountComponent;
  let fixture: ComponentFixture<OrderAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
