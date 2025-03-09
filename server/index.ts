import express from "express";
import dotenv from "dotenv";
import recipesRouter from "./src/routes/recipes";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/recipes", recipesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
