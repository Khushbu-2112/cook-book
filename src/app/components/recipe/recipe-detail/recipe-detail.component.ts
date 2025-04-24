import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../../interfaces/recipe.model';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | undefined;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipe = this.recipeService.getRecipeById(id);
    this.loading = false;
  }

  toggleFavorite(): void {
    if (this.recipe) {
      if (this.recipeService.isFavorite(this.recipe.id)) {
        this.recipeService.removeFromFavorites(this.recipe.id);
      } else {
        this.recipeService.addToFavorites(this.recipe);
      }
    }
  }

  isFavorite(): boolean {
    return this.recipe ? this.recipeService.isFavorite(this.recipe.id) : false;
  }
}