import { computed, inject, Injectable, signal } from '@angular/core';
import { Movie } from '../../../features/movies/models/movie.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private authService = inject(AuthService);

  private watchlistSignal = signal<Movie[]>([]);
  public watchlist = this.watchlistSignal.asReadonly();

  public bookmarkedIds = computed(() => new Set(this.watchlist().map((movie) => movie.id)));

  addMovie(movie: Movie) {
    this.watchlistSignal.update((curList) => [...curList, movie]);
  }

  removeMovie(movieId: number) {
    this.watchlistSignal.update((curList) => curList.filter((movie) => movieId !== movie.id));
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
