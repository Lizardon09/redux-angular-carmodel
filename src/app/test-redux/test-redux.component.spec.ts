import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReduxComponent } from './test-redux.component';

describe('TestReduxComponent', () => {
  let component: TestReduxComponent;
  let fixture: ComponentFixture<TestReduxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestReduxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestReduxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
