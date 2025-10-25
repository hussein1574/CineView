import { Component, inject } from '@angular/core';
import { WatchlistService } from '../../../../core/services/watchlist/watchlist.service';
import { MovieCardComponent } from '../../../../shared/components/movie-card/movie-card.component';
import { Movie } from '../../../movies/models/movie.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'watchlist',
  imports: [MovieCardComponent, RouterLink],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css',
})
export class WatchlistComponent {
  private watchlistService = inject(WatchlistService);
  watchlist = this.watchlistService.watchlist;
  removeBook(movie: Movie) {
    this.watchlistService.removeMovie(movie.id);
  }
}
