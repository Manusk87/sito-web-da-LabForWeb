import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private loggedIn = false;

  login(username: string, password: string): boolean {
    // Implementazione fittizia per il login
    this.loggedIn = true;
    return true;
  }

  logout(): void {
    this.loggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }
}

