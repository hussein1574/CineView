import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MovieListComponent } from '../../../movies/components/movie-list/movie-list.component';
import { MovieOfTheYearComponent } from '../../../movies/components/movie-of-the-year/movie-of-the-year.component';
import { MoviesService } from '../../../../core/services/movie/movies-service';
import { Movie } from '../../../movies/models/movie.model';
import { WatchlistService } from '../../../../core/services/watchlist/watchlist.service';

@Component({
  selector: 'app-home.component',
  imports: [MovieListComponent, MovieOfTheYearComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private watchListService = inject(WatchlistService);

  private allMovies = signal<Movie[]>([]);
  isLoading = signal<boolean>(true);
  movieOfTheYear = computed(() => this.allMovies()?.[0] ?? null);
  movieList = computed(() => this.allMovies().slice(1));

  // Use bookmarkedIds from service
  public bookmarkedIds = this.watchListService.bookmarkedIds;

  isMovieOfTheYearBookmarked = computed(() => {
    const movie = this.movieOfTheYear();
    return movie ? this.bookmarkedIds().has(movie.id) : false;
  });

  ngOnInit(): void {
    this.isLoading.set(true);
    this.moviesService.getTrendingMovies().subscribe({
      next: (movies) => {
        this.allMovies.set(movies);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log('Failed to load movies for Home', err);
        this.isLoading.set(false);
      },
    });
  }

  bookmarkMovie(movie: Movie) {
    this.watchListService.toggleBookmark(movie);
  }
}
