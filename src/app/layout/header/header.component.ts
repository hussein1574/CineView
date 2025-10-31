import { Component, inject, signal } from '@angular/core';
import { Router, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoggedIn = this.authService.isLoggedIn;
  currentUserName = this.authService.currentUserName;

  // Signal to track mobile menu state
  isMobileMenuOpen = signal(false);

  redirectToLogin() {
    if (this.isLoggedIn()) {
      this.authService.logout();
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((value) => !value);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
