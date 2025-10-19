import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MoviesService } from '../../services/movies-service';
import { Movie } from '../../models/movie.model';
import { OnInit } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'movie-list',
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent implements OnInit {
  movies = signal<Movie[]>([]);
  private movieService = inject(MoviesService);
  ngOnInit(): void {
    this.movieService.getTrendingMovies().subscribe({
      next: (moviesData) => {
        this.movies.set(moviesData);
      },
      error: (err) => console.error('Failed to load movies', err),
    });
  }
}
