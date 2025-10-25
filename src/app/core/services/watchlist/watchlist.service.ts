import { Injectable, signal } from '@angular/core';
import { Movie } from '../../../features/movies/models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private watchlistSignal = signal<Movie[]>([]);
  public watchlist = this.watchlistSignal.asReadonly();
  addMovie(movie: Movie) {
    this.watchlistSignal.update((curList) => [...curList, movie]);
  }
  removeMovie(movieId: number) {
    this.watchlistSignal.update((curList) => curList.filter((movie) => movieId !== movie.id));
  }
}
