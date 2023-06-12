import express from "express";
import {
  addFavorites,
  getFavorites,
} from "../controllers/favoriteController.js";

const router = express.Router();

router.post("/", addFavorites).get("/:id", getFavorites);

export default router;
