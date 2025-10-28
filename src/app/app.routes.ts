import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './core/guards/index';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/components/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'movies/:id',
    loadComponent: () =>
      import('./features/movies/components/movie-details/movie-details.component').then(
        (c) => c.MovieDetailsComponent
      ),
  },
  {
    path: 'watchlist',
    loadComponent: () =>
      import('./features/watchlist/components/watchlist/watchlist.component').then(
        (c) => c.WatchlistComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search/components/search-page/search-page.component').then(
        (c) => c.SearchPageComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login.component').then((c) => c.LoginComponent),
    canActivate: [publicGuard],
  },
];
