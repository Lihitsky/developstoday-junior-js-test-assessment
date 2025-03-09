import axios from "axios";
import { RecipeFilters, RecipesResponse } from "../types/recipe";

const API_BASE_URL = "http://localhost:3001/api/recipes";

export const getRecipes = async (
  filters: RecipeFilters
): Promise<RecipesResponse> => {
  const params = new URLSearchParams(filters as any).toString();
  const response = await axios.get<RecipesResponse>(
    `${API_BASE_URL}?${params}`
  );
  return response.data;
};

export const getRecipeById = async (id: string): Promise<RecipesResponse> => {
  const response = await axios.get<RecipesResponse>(`${API_BASE_URL}/${id}`);
  return response.data;
};
