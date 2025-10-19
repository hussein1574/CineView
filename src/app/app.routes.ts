import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/movies/components/movie-list/movie-list.component').then(
        (c) => c.MovieList
      ),
  },
  {
    path: 'movies/:id',
    loadComponent: () =>
      import('./features/movies/components/movie-details/movie-details.component').then(
        (c) => c.MovieDetailsComponent
      ),
  },
];
