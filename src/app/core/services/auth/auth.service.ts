import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  dummyUser = {
    username: 'user',
    password: 'password',
    name: 'John Doe',
    bookmarkedMovies: [],
  };
  private isLoggedInSignal = signal<boolean>(false);

  public isLoggedIn = this.isLoggedInSignal.asReadonly();

  private currentUserSignal = signal<{ name: string } | null>(null);
  public currentUser = this.currentUserSignal.asReadonly();
  public currentUserName = computed(() => this.currentUser()?.name ?? null);

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
}
