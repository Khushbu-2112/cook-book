import { Recipe } from "./recipe.model";

export interface User {
  id: number;
  name: string;
  email: string;
  profilePicture?: string;
}