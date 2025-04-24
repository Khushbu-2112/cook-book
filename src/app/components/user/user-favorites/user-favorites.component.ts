import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Recipe } from '../../../interfaces/recipe.model';
import { RecipeService } from '../../recipe/service/recipe.service';

@Component({
  selector: 'app-user-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.css']
})
export class UserFavoritesComponent implements OnInit {
  // Use public observable from RecipeService
  favorites$ = this.recipeService.favorites$;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    // Initial load of favorites handled by RecipeService signal
  }

  removeFromFavorites(recipeId: number): void {
    this.recipeService.removeFromFavorites(recipeId);
  }

  viewRecipe(recipeId: number): void {
    // Navigation handled by RouterLink in template
  }
}