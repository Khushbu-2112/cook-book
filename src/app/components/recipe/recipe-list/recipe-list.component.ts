import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../../../interfaces/recipe.model';
import { RecipeService } from '../service/recipe.service';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RecipeCardComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  isLoading = false;
  error: string | null = null;

  // Use signals from RecipeService
  filteredRecipes = this.recipeService.filteredRecipes;
  selectedDifficulty = '';
  searchTerm = '';
  
  // Ingredient filtering
  ingredientInput = '';
  selectedIngredients: string[] = [];

  constructor(public recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.isLoading = true;
    this.error = null;

    this.recipeService.fetchRecipes()
      .subscribe({
        error: (error) => {
          this.error = 'Failed to load recipes. Please try again later.';
          console.error('Error loading recipes:', error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.recipeService.setSearchTerm(term);
  }

  onDifficultyChange(difficulty: string): void {
    this.selectedDifficulty = difficulty;
    this.recipeService.setDifficultyFilter(difficulty);
  }

  addIngredient(): void {
    if (this.ingredientInput.trim()) {
      const ingredient = this.ingredientInput.trim().toLowerCase();
      if (!this.selectedIngredients.includes(ingredient)) {
        this.selectedIngredients.push(ingredient);
        this.recipeService.setIngredientFilters(this.selectedIngredients);
      }
      this.ingredientInput = '';
    }
  }

  removeIngredient(ingredient: string): void {
    this.selectedIngredients = this.selectedIngredients.filter(i => i !== ingredient);
    this.recipeService.setIngredientFilters(this.selectedIngredients);
  }

  toggleFavorite(recipe: Recipe): void {
    if (this.recipeService.isFavorite(recipe.id)) {
      this.recipeService.removeFromFavorites(recipe.id);
    } else {
      this.recipeService.addToFavorites(recipe);
    }
  }
}