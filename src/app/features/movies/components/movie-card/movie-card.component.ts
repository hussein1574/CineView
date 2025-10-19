import { Component, input } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'movie-card',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  movie = input.required<Movie>();
  imageBaseUrl = environment.imageBaseUrl;
}
