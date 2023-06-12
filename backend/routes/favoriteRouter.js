import express from "express";
import {
  addFavorites,
  getFavorites,
  deleteFavorite,
} from "../controllers/favoriteController.js";

const router = express.Router();

router
  .post("/", addFavorites)
  .get("/", getFavorites)
  .delete("/:id", deleteFavorite);

export default router;
