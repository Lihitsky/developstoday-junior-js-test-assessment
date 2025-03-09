import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { List, Select } from "antd";
import { getRecipes } from "../services/api";
import { Recipe, RecipeFilters } from "../types/recipe";
import Spinner from "./Spinner";
import { showErrorToast } from "../utils/toast";
import Pagination from "./Pagination";

const { Option } = Select;

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filter, setFilter] = useState<RecipeFilters>({
    ingredient: "",
    country: "",
    category: "",
  });
  const [selectedFilter, setSelectedFilter] = useState<
    "ingredient" | "country" | "category"
  >("ingredient");
  const [filterValue, setFilterValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const newFilter: RecipeFilters = {
      ingredient: "",
      country: "",
      category: "",
    };
    newFilter[selectedFilter] = filterValue;
    setFilter(newFilter);
  }, [selectedFilter, filterValue]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(filter);
        setRecipes(data.meals || []);
        setCurrentPage(1);
      } catch (error) {
        showErrorToast("Failed to fetch recipes");
        console.error("Failed to fetch recipes:", error);
      }
    };
    fetchRecipes();
  }, [filter]);

  if (!recipes.length) return <Spinner size="large" />;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedRecipes = recipes.slice(startIndex, endIndex);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Recipes</h1>
      <div style={{ marginBottom: "20px" }}>
        <Select
          placeholder="Select filter type"
          value={selectedFilter}
          onChange={(value: "ingredient" | "country" | "category") => {
            setSelectedFilter(value);
            setFilterValue("");
          }}
          style={{ width: 200, marginRight: 10, marginBottom: 10 }}
        >
          <Option value="ingredient">Ingredient</Option>
          <Option value="country">Country</Option>
          <Option value="category">Category</Option>
        </Select>

        {selectedFilter === "ingredient" && (
          <Select
            placeholder="Select ingredient"
            value={filterValue}
            onChange={(value: string) => setFilterValue(value)}
            style={{ width: 200, marginRight: 10, marginBottom: 10 }}
          >
            <Option value="">None</Option>
            <Option value="chicken_breast">Chicken Breast</Option>
          </Select>
        )}
        {selectedFilter === "country" && (
          <Select
            placeholder="Select country"
            value={filterValue}
            onChange={(value: string) => setFilterValue(value)}
            style={{ width: 200, marginRight: 10, marginBottom: 10 }}
          >
            <Option value="">None</Option>
            <Option value="Canadian">Canadian</Option>
            <Option value="Italian">Italian</Option>
          </Select>
        )}
        {selectedFilter === "category" && (
          <Select
            placeholder="Select category"
            value={filterValue}
            onChange={(value: string) => setFilterValue(value)}
            style={{ width: 200, marginRight: 10, marginBottom: 10 }}
          >
            <Option value="">None</Option>
            <Option value="Seafood">Seafood</Option>
            <Option value="Dessert">Dessert</Option>
          </Select>
        )}
      </div>

      <List
        bordered
        dataSource={displayedRecipes}
        renderItem={(recipe: Recipe) => (
          <List.Item
            onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
            style={{ cursor: "pointer" }}
          >
            {recipe.strMeal}
          </List.Item>
        )}
      />

      <Pagination
        current={currentPage}
        total={recipes.length}
        pageSize={pageSize}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default RecipeList;
