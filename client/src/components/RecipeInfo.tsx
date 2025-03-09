import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, List, Button } from "antd";
import { getRecipeById, getRecipes } from "../services/api";
import { Recipe } from "../types/recipe";
import { showErrorToast } from "../utils/toast";
import Spinner from "./Spinner";

const RecipeInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        try {
          const data = await getRecipeById(id);
          setRecipe(data.meals[0]);
        } catch (error) {
          showErrorToast("Failed to fetch recipe");
          console.error("Failed to fetch recipe:", error);
        }
      }
    };
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (recipe) {
      const fetchCategoryRecipes = async () => {
        try {
          const data = await getRecipes({ category: recipe.strCategory });
          setCategoryRecipes(data.meals.slice(0, 8) || []);
        } catch (error) {
          showErrorToast("Failed to fetch category recipes");
          console.error("Failed to fetch category recipes:", error);
        }
      };
      fetchCategoryRecipes();
    }
  }, [recipe]);

  if (!recipe) return <Spinner size="large" />;

  const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
    .map((i) => {
      const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
      const measure = recipe[`strMeasure${i}` as keyof Recipe];
      if (ingredient && ingredient.trim()) {
        return { ingredient, measure };
      }
      return null;
    })
    .filter((item) => item !== null);

  return (
    <div style={{ padding: "20px" }}>
      <Button
        type="default"
        onClick={() => navigate(-1)}
        style={{ marginBottom: "20px" }}
      >
        Back
      </Button>
      <Row gutter={[16, 16]} justify="center">
        <Col
          xs={24}
          sm={10}
          md={8}
          lg={6}
          xl={4}
          style={{ textAlign: "center" }}
        >
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            style={{ maxWidth: "100%", borderRadius: "10px" }}
          />
        </Col>

        <Col xs={24} sm={14} md={12} lg={10} xl={10}>
          <h2 style={{ textAlign: "center", fontSize: "1.8rem" }}>
            {recipe.strMeal}
          </h2>
          <p
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {recipe.strArea}
          </p>
          <p style={{ textAlign: "justify", fontSize: "1rem" }}>
            {recipe.strInstructions}
          </p>

          <h3 style={{ marginTop: "20px" }}>Ingredients:</h3>
          <ul style={{ paddingLeft: "20px" }}>
            {ingredients.map((item, index) => (
              <li key={index} style={{ fontSize: "1rem", marginBottom: "5px" }}>
                {item?.measure} {item?.ingredient}
              </li>
            ))}
          </ul>
        </Col>

        <Col xs={24} sm={24} md={24} lg={8} xl={6}>
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
            Recipes in {recipe.strCategory}
          </h3>
          <List
            bordered
            dataSource={categoryRecipes}
            renderItem={(item: Recipe) => (
              <List.Item
                onClick={() => navigate(`/recipe/${item.idMeal}`)}
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  fontSize: "1rem",
                }}
              >
                {item.strMeal}
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default RecipeInfo;
