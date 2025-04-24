import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from '../../../interfaces/user.model';
import { Recipe } from '../../../interfaces/recipe.model';
import { UserService } from '../service/user.service';
import { RecipeService } from '../../recipe/service/recipe.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: User = {
    id: 1,
    name: '',
    email: '',
    profilePicture: 'assets/default-profile.jpg'
  };

  // Use favorites signal from RecipeService
  favorites$ = this.recipeService.favorites$;

  constructor(
    private userService: UserService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  updateProfile(): void {
    this.userService.updateProfile(this.user).subscribe({
      next: (updatedUser) => {
        console.log('Profile updated successfully');
        this.user = updatedUser;
      },
      error: (error) => {
        console.error('Error updating profile:', error);
      }
    });
  }

  removeFromFavorites(recipeId: number): void {
    this.recipeService.removeFromFavorites(recipeId);
  }

  isFavorite(recipeId: number): boolean {
    return this.recipeService.isFavorite(recipeId);
  }
}