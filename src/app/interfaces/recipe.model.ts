export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  difficulty: string;
  imageUrl: string;
}

export interface DummyJSONResponse {
  recipes: {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    difficulty: string;
    image: string;
    description?: string;
  }[];
  total: number;
  skip: number;
  limit: number;
}