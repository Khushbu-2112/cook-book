import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Recipe } from '../../../interfaces/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Input() isFavorite: boolean = false;
  @Output() favoriteToggled = new EventEmitter<Recipe>();

  onFavoriteClick(): void {
    this.favoriteToggled.emit(this.recipe);
  }
}