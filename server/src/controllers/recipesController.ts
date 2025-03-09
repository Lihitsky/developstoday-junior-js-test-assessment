import axios from "axios";
import cache from "../utils/cache";

export const getRecipes = async (req: any, res: any) => {
  const { ingredient, country, category } = req.query as {
    ingredient?: string;
    country?: string;
    category?: string;
  };

  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
  const queryKey = `${ingredient || ""}-${country || ""}-${category || ""}`;

  if (cache[queryKey]) {
    return res.json(cache[queryKey]);
  }

  if (ingredient) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  } else if (country) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`;
  } else if (category) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  }

  try {
    const response = await axios.get(url);
    const data = response.data;
    cache[queryKey] = data;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error occurred while fetching recipes" });
  }
};

export const getRecipeById = async (req: any, res: any) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Recipe ID is required" });
  }

  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  if (cache[id]) {
    return res.json(cache[id]);
  }

  try {
    const response = await axios.get(url);
    const data = response.data;
    cache[id] = data;
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Error occurred while fetching recipe details",
    });
  }
};
