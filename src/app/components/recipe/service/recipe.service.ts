import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DummyJSONResponse, Recipe } from '../../../interfaces/recipe.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // Signals
  private recipesSignal = signal<Recipe[]>([]);
  private favoritesSignal = signal<Recipe[]>([]);
  private searchTermSignal = signal<string>('');
  private difficultyFilterSignal = signal<string>('');
  private ingredientFiltersSignal = signal<string[]>([]);

  // Public getters
  recipes$ = toObservable(this.recipesSignal);
  favorites$ = toObservable(this.favoritesSignal);
    filteredRecipes = computed(() => {
      const recipes = this.recipesSignal();
      const searchTerm = this.searchTermSignal().toLowerCase().trim();
      const difficulty = this.difficultyFilterSignal();
      const ingredients = this.ingredientFiltersSignal()
        .map(ing => ing.toLowerCase().trim())
        .filter(ing => ing.length > 0);
  
      return recipes.filter((recipe) => {
        // Search matching
        const matchesSearch = searchTerm
          ? recipe.title.toLowerCase().includes(searchTerm) ||
            recipe.description.toLowerCase().includes(searchTerm) ||
            recipe.ingredients.some(i => 
              i.toLowerCase().includes(searchTerm)
            )
          : true;
  
        // Difficulty matching
        const matchesDifficulty = difficulty
          ? recipe.difficulty === difficulty
          : true;
  
        // Ingredient matching - must have ALL selected ingredients
        const matchesIngredients = ingredients.length > 0
          ? ingredients.every(selectedIngredient => 
              recipe.ingredients.some(recipeIngredient => 
                recipeIngredient.toLowerCase().includes(selectedIngredient)
              )
            )
          : true;
  
        return matchesSearch && matchesDifficulty && matchesIngredients;
      });
  });

  constructor(private http: HttpClient) {}

  // Fetch recipes from API
  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<DummyJSONResponse>('https://dummyjson.com/recipes')
      .pipe(
        map((response) =>
          response.recipes.map((item) => ({
            id: item.id,
            title: item.name,
            description: item.description || `${item.name} recipe`,
            ingredients: item.ingredients,
            instructions: item.instructions,
            cookingTime: item.prepTimeMinutes,
            difficulty: item.difficulty.toLowerCase(),
            imageUrl: item.image,
          }))
        ),
        map((recipes) => {
          this.recipesSignal.set(recipes);
          return recipes;
        }),
        catchError((error) => {
          console.error('Error fetching recipes:', error);
          return throwError(() => new Error('Failed to fetch recipes'));
        })
      );
  }

  // Search and filter methods
  setSearchTerm(term: string): void {
    this.searchTermSignal.set(term);
  }

  setDifficultyFilter(difficulty: string): void {
    this.difficultyFilterSignal.set(difficulty);
  }

  // Favorites management
  addToFavorites(recipe: Recipe): void {
    const currentFavorites = this.favoritesSignal();
    if (!currentFavorites.some((fav) => fav.id === recipe.id)) {
      this.favoritesSignal.update((favorites) => [...favorites, recipe]);
    }
  }

  removeFromFavorites(recipeId: number): void {
    this.favoritesSignal.update((favorites) =>
      favorites.filter((recipe) => recipe.id !== recipeId)
    );
  }

  isFavorite(recipeId: number): boolean {
    return this.favoritesSignal().some((recipe) => recipe.id === recipeId);
  }

  // Get recipe by ID
  getRecipeById(id: number): Recipe | undefined {
    return this.recipesSignal().find((recipe) => recipe.id === id);
  }

  // Add method to set ingredient filters
  setIngredientFilters(ingredients: string[]): void {
    this.ingredientFiltersSignal.set(ingredients);
  }
}
