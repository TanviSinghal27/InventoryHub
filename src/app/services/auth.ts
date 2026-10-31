import { inject, Service, signal } from '@angular/core';
import { Storage } from './storage';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Service()
export class Auth {
  private storage = inject(Storage);
  private router = inject(Router);
  isAuthenticated = signal<boolean>(!!this.storage.get('token'));

  login() {
    this.storage.set('token', 'mock-jwt-token');
    this.isAuthenticated.set(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.storage.set('token', null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  return auth.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
