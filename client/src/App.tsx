import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RecipeList from "./components/RecipeList";
import RecipeInfo from "./components/RecipeInfo";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeInfo />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
