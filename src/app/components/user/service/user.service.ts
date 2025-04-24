import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../../interfaces/user.model';
import { toObservable } from '@angular/core/rxjs-interop';
import { RecipeService } from '../../recipe/service/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // User signal
  private userSignal = signal<User>({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    profilePicture: 'assets/default-profile.jpg'
  });

  // Public observable for components
  user$ = toObservable(this.userSignal);

  constructor(private recipeService: RecipeService) {
    this.loadUserFromStorage();
  }

  getUserProfile(): Observable<User> {
    return this.user$;
  }

  updateProfile(user: User): Observable<User> {
    this.userSignal.set(user);
    this.saveUserToStorage(user);
    return of(user);
  }

  private loadUserFromStorage(): void {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        this.userSignal.set(user);
      } catch (error) {
        console.error('Error loading user from storage:', error);
      }
    }
  }

  private saveUserToStorage(user: User): void {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }

  // Method to get current user value
  getCurrentUser(): User {
    return this.userSignal();
  }

  // Method to update specific user fields
  updateUserField(field: keyof User, value: any): void {
    this.userSignal.update(user => ({
      ...user,
      [field]: value
    }));
    this.saveUserToStorage(this.userSignal());
  }

  // Method to clear user data (logout)
  clearUser(): void {
    this.userSignal.set({
      id: 1,
      name: '',
      email: '',
      profilePicture: 'assets/default-profile.jpg'
    });
    localStorage.removeItem('user');
  }
}