import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { MoviesService } from '../../../../core/services/movie/movies-service';
import { Movie } from '../../models/movie.model';
import { OnInit } from '@angular/core';
import { MovieCardComponent } from '../../../../shared/components/movie-card/movie-card.component';
import { WatchlistService } from '../../../../core/services/watchlist/watchlist.service';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'movie-list',
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  movies = input.required<Movie[]>();
  bookmarkedIds = input.required<Set<number>>();
  bookmarkRequest = output<Movie>();

  handleBookmarkEventFromCard(movie: Movie) {
    this.bookmarkRequest.emit(movie);
  }
}
