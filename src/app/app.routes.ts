import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe/recipe-detail/recipe-detail.component';
import { HomeComponent } from './components/home/home.component';
import { UserFavoritesComponent } from './components/user/user-favorites/user-favorites.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'recipes',
    component: RecipeListComponent
  },
  {
    path: 'recipes/:id',
    component: RecipeDetailComponent
  },
  {
    path: 'favorites',
    component: UserFavoritesComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];