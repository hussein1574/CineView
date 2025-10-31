import { computed, inject, Injectable } from '@angular/core';
import { Movie } from '../../../features/movies/models/movie.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private authService = inject(AuthService);

  // Use bookmarked movies from AuthService
  public watchlist = this.authService.bookmarkedMovies;

  public bookmarkedIds = computed(() => new Set(this.watchlist().map((movie) => movie.id)));

  addMovie(movie: Movie) {
    this.authService.addBookmarkedMovie(movie);
  }

  removeMovie(movieId: number) {
    this.authService.removeBookmarkedMovie(movieId);
  }

  // Toggle bookmark - can be used by any component
  toggleBookmark(movie: Movie) {
    if (this.authService.isLoggedIn()) {
      if (!this.bookmarkedIds().has(movie.id)) {
        this.addMovie(movie);
      } else {
        this.removeMovie(movie.id);
      }
    } else {
      alert('Please login to add movies to your watchlist');
    }
  }

  // Check if a movie is bookmarked
  isBookmarked(movieId: number): boolean {
    return this.bookmarkedIds().has(movieId);
  }
}
