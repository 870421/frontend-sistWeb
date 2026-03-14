import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HeaderComponent } from '../../../layout/components/header/header';
interface UserProfile {
  _id?: string;
  name: string;
  email: string;
  username?: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  interests?: string[];
}

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})
export class ProfileViewComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  user: UserProfile = {
    name: 'Jeffrey Preston Bezos',
    email: 'jeff@amazon.com',
    username: 'jeffAmazon',
    avatarUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/91/Jeff_Bezos_2016.jpg',
    interests: ['culture', 'sports', 'family']
  };

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.user = {
        _id: currentUser._id,
        name: currentUser.name || 'Usuario',
        email: currentUser.email || '',
        username: currentUser.username || '',
        avatarUrl: currentUser.avatarUrl || 'assets/images/default-avatar.png',
        bio: currentUser.bio || '',
        location: currentUser.location || '',
        interests: currentUser.interests || ['culture', 'sports', 'family']
      };
    }
  }

  goToEditProfile(): void {
    this.router.navigate(['/profile/edit']);
  }

  goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  goToHistory(): void {
    this.router.navigate(['/history']);
  }

  goToStats(): void {
    this.router.navigate(['/stats']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}