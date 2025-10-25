import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Movie, MovieListResponse } from '../../../features/movies/models/movie.model';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getTrendingMovies(): Observable<Movie[]> {
    return this.http
      .get<MovieListResponse>(`${this.apiUrl}/movie/popular`)
      .pipe(map((response) => response.results));
  }
  getMovieDetails(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}`);
  }
}
