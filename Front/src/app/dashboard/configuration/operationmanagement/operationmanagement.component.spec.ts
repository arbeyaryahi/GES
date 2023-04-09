import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationmanagementComponent } from './operationmanagement.component';

describe('OperationmanagementComponent', () => {
  let component: OperationmanagementComponent;
  let fixture: ComponentFixture<OperationmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationmanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
