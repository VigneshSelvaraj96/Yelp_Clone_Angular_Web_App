import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailscardComponent } from './detailscard.component';

describe('DetailscardComponent', () => {
  let component: DetailscardComponent;
  let fixture: ComponentFixture<DetailscardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailscardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
