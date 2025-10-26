import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MovieCardComponent } from '../../../../shared/components/movie-card/movie-card.component';
import { Movie } from '../../../movies/models/movie.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { MoviesService } from '../../../../core/services/movie/movies-service';
import { WatchlistService } from '../../../../core/services/watchlist/watchlist.service';

@Component({
  selector: 'search-page',
  imports: [MovieCardComponent, ReactiveFormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent implements OnInit, OnDestroy {
  private moviesService = inject(MoviesService);
  private watchlistService = inject(WatchlistService);

  bookmarkedIds = this.watchlistService.bookmarkedIds;
  movies = signal<Movie[]>([]);

  isLoading = signal<boolean>(false);
  searchError = signal<string | null>(null);
  hasSearched = signal<boolean>(false);

  searchInput = new FormControl('');

  private searchSubscription?: Subscription;
  private searchPipe$ = this.searchInput.valueChanges.pipe(
    debounceTime(300),
    map((value) => value?.trim() ?? ''),
    distinctUntilChanged(),
    filter((query) => query.length > 2 || query.length === 0),
    tap(() => {
      this.isLoading.set(true);
      this.searchError.set(null);
      this.hasSearched.set(true);
    }),
    switchMap((query) => {
      if (query.length === 0) {
        return of([]);
      }
      return this.moviesService.searchForMovie(query).pipe(
        catchError((err) => {
          console.error('Search failed', err);
          this.searchError.set('Failed to load search results.');
          this.isLoading.set(false);
          return of([]);
        })
      );
    })
  );

  ngOnInit() {
    this.searchSubscription = this.searchPipe$.subscribe((results) => {
      const filteredResults = results.filter((movie) => movie.poster_path);
      this.movies.set(filteredResults);
      this.isLoading.set(false);
      if (this.searchInput.value?.trim() === '') {
        this.hasSearched.set(false);
      }
    });
  }

  bookmarkMovie(movie: Movie) {
    this.watchlistService.toggleBookmark(movie);
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
  }
}
