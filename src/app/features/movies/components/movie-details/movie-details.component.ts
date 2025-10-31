import { Component, computed, inject, Input, signal } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../../../core/services/movie/movies-service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { MinutesToHoursPipe } from '../../../../shared/pipes/minutes-to-hours-pipe';
import { AiService } from '../../../../core/services/ai/ai.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-details.component',
  imports: [CommonModule, MinutesToHoursPipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  private movieService = inject(MoviesService);
  private AIService = inject(AiService);
  private authService = inject(AuthService);
  private router = inject(Router);

  tmdbImageBaseUrl = environment.tmdbImageBaseUrl;
  @Input() id!: string;
  movie = signal<Movie | null>(null);
  AISummary = signal<string | null>(null);
  AISummaryLoading = signal<boolean>(false);
  AISummaryError = signal<string | null>(null);

  public movieGenres = computed(() => {
    const genres = this.movie()?.genres ?? [];
    if (genres.length === 0) {
      return '';
    }
    return genres.map((genre) => genre.name).join(', ');
  });

  ngOnInit(): void {
    this.movieService.getMovieDetails(this.id).subscribe({
      next: (movieDetail) => {
        this.movie.set(movieDetail);
      },
      error: (err) => console.error('Failed to load movie', err),
    });
  }
  summarize(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    const title = this.movie()?.title ?? 'Unknown';
    this.AISummaryLoading.set(true);
    this.AISummaryError.set(null);
    this.AIService.getAiSummary(title).subscribe({
      next: (summary) => {
        this.AISummary.set(summary);
        this.AISummaryLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to get AI summary', err);
        this.AISummaryLoading.set(false);
        this.AISummaryError.set('Failed to generate summary');
      },
    });
  }
}
