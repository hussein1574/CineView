import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOfTheYearComponent } from './movie-of-the-year.component';

describe('MovieOfTheYearComponent', () => {
  let component: MovieOfTheYearComponent;
  let fixture: ComponentFixture<MovieOfTheYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieOfTheYearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieOfTheYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
