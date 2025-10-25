import { Component, computed, inject, Input, signal } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../../../core/services/movie/movies-service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-movie-details.component',
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  imageBaseUrl = environment.imageBaseUrl;
  @Input() id!: string;
  movie = signal<Movie | null>(null);
  public movieGenres = computed(() => {
    const genres = this.movie()?.genres ?? [];
    if (genres.length === 0) {
      return '';
    }
    return genres.map((genre) => genre.name).join(', ');
  });
  private movieService = inject(MoviesService);
  ngOnInit(): void {
    this.movieService.getMovieDetails(this.id).subscribe({
      next: (movieDetail) => {
        this.movie.set(movieDetail);
      },
      error: (err) => console.error('Failed to load movie', err),
    });
  }
}
