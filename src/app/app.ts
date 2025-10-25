import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('CineView');
  private authSerive = inject(AuthService);
  isLoggedIn = this.authSerive.isLoggedIn;

  toggleLogin() {
    if (this.isLoggedIn()) {
      this.authSerive.logout();
      alert('You have been logged out');
    } else {
      this.authSerive.login();
      alert('You have been logged in');
    }
  }
}
