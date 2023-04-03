import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultstableComponent } from './resultstable.component';

describe('ResultstableComponent', () => {
  let component: ResultstableComponent;
  let fixture: ComponentFixture<ResultstableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultstableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
