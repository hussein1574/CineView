import { Component, computed, inject, input, output } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'movie-of-the-year',
  imports: [],
  templateUrl: './movie-of-the-year.component.html',
  styleUrl: './movie-of-the-year.component.css',
})
export class MovieOfTheYearComponent {
  movie = input.required<Movie | null>();
  isBookmarked = input.required<boolean>();
  bookmarkRequest = output<Movie>();
  imageBaseUrl = environment.imageBaseUrl;

  onBookmarkClick() {
    const currentMovie = this.movie();
    if (currentMovie) {
      this.bookmarkRequest.emit(currentMovie);
    }
  }
}
