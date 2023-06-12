import { sql } from "../server.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const addFavorites = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { cardId } = req.body;

    const decodedId = Number(jwt.verify(token, process.env.JWT_SECRET));
    const [{ id: deckId }] =
      await sql`SELECT id FROM decks WHERE user_id = ${decodedId}`;

    const addedCard =
      await sql`INSERT INTO pokemon_cards (deck_id, card_id) VALUES (${deckId}, ${cardId}) RETURNING *;`;
    res.status(201).json({ status: "success", addedCard: addedCard[0] });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedId = Number(jwt.verify(token, process.env.JWT_SECRET));
    const [{ id: deckId }] =
      await sql`SELECT id FROM decks WHERE user_id = ${decodedId}`;
    const favorites =
      await sql`SELECT * FROM pokemon_cards WHERE deck_id = ${deckId};`;

    if (favorites.length === 0) {
      res.status(404).json({ err: "No favorites found" });
      return;
    }
    console.log(favorites);
    res.status(200).json({
      status: "success",
      favorites,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const deleteFavorite = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { id: cardId } = req.params;
  console.log(cardId);
  const decodedId = Number(jwt.verify(token, process.env.JWT_SECRET));

  if (!decodedId) {
    res.status(401).json({ err: "Unauthorized" });
    return;
  }
  const [{ id: deckId }] =
    await sql`SELECT id FROM decks WHERE user_id = ${decodedId}`;
  console.log(deckId);
  const deletedCard =
    await sql`DELETE FROM pokemon_cards WHERE card_id = ${cardId} AND deck_id = ${deckId} RETURNING *;`;
  console.log(deletedCard);
};
