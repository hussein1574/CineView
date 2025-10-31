import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Movie, MovieListResponse } from '../../../features/movies/models/movie.model';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private tmdbAPIUrl = environment.tmdbAPIUrl;
  private http = inject(HttpClient);

  getTrendingMovies(): Observable<Movie[]> {
    return this.http
      .get<MovieListResponse>(`${this.tmdbAPIUrl}/movie/popular`)
      .pipe(map((response) => response.results));
  }
  getMovieDetails(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.tmdbAPIUrl}/movie/${id}`);
  }
  searchForMovie(query: string): Observable<Movie[]> {
    return this.http
      .get<MovieListResponse>(`${this.tmdbAPIUrl}/search/movie?query=${query}`)
      .pipe(map((response) => response.results));
  }
  searchForMultipleMovies(queries: string[]): Observable<Movie[]> {
    if (queries.length === 0) {
      return of([]);
    }
    const requests: Observable<Movie | null>[] = queries.map((query) =>
      this.searchForMovie(query).pipe(map((movies) => (movies.length > 0 ? movies[0] : null)))
    );
    return forkJoin(requests).pipe(
      map((movies) => movies.filter((movie): movie is Movie => movie !== null))
    );
  }
}
