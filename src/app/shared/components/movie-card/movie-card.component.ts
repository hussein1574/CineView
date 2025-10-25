import { Component, input, output } from '@angular/core';
import { Movie } from '../../../features/movies/models/movie.model';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'movie-card',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  cardPage = input.required<'home' | 'watchlist'>();
  movie = input.required<Movie>();
  isBookmarked = input.required<boolean>();
  bookmarked = output<Movie>();
  imageBaseUrl = environment.imageBaseUrl;

  notifyParent() {
    this.bookmarked.emit(this.movie());
  }
}
