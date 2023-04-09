import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutoperationsComponent } from './ajoutoperations.component';

describe('AjoutoperationsComponent', () => {
  let component: AjoutoperationsComponent;
  let fixture: ComponentFixture<AjoutoperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutoperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutoperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
