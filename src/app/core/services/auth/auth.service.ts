import { computed, Injectable, signal } from '@angular/core';
import { Movie } from '../../../features/movies/models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  dummyUser = {
    username: 'user',
    password: 'password',
    name: 'John Doe',
    bookmarkedMovies: [] as Movie[],
  };

  private isLoggedInSignal = signal<boolean>(false);
  public isLoggedIn = this.isLoggedInSignal.asReadonly();

  private currentUserSignal = signal<{ name: string; bookmarkedMovies: Movie[] } | null>(null);
  public currentUser = this.currentUserSignal.asReadonly();
  public currentUserName = computed(() => this.currentUser()?.name ?? null);

  // Expose bookmarked movies
  public bookmarkedMovies = computed(() => this.currentUser()?.bookmarkedMovies ?? []);

  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.isLoggedInSignal.set(true);
        this.currentUserSignal.set(user);
      } catch (e) {
        console.error('Error parsing stored user', e);
        localStorage.removeItem('user');
      }
    }
  }

  login() {
    this.isLoggedInSignal.set(true);
    this.currentUserSignal.set(this.dummyUser);
    localStorage.setItem('user', JSON.stringify(this.dummyUser));
  }

  logout() {
    this.isLoggedInSignal.set(false);
    this.currentUserSignal.set(null);
    localStorage.removeItem('user');
  }

  addBookmarkedMovie(movie: Movie) {
    const currentUser = this.currentUserSignal();
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        bookmarkedMovies: [...currentUser.bookmarkedMovies, movie],
      };
      this.currentUserSignal.set(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }

  removeBookmarkedMovie(movieId: number) {
    const currentUser = this.currentUserSignal();
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        bookmarkedMovies: currentUser.bookmarkedMovies.filter((movie) => movie.id !== movieId),
      };
      this.currentUserSignal.set(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }
}
