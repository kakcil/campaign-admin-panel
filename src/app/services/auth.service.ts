import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) { 
    //checks user session in case of page refresh
    this.isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  }

  login(username: string, password: string): boolean {
    //simple authentication check
    if (username === 'admin' && password === '1234') {
      this.isAuthenticated = true;
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
