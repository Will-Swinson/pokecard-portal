import { sql } from "../server.js";

export const addFavorites = async (req, res) => {
  try {
    const { cardId, token } = req.body;
    const [{ id: deckId }] =
      await sql`SELECT id FROM decks WHERE user_id = ${token}`;

    const addedCard =
      await sql`INSERT INTO pokemon_cards (deck_id, card_id) VALUES (${deckId}, ${cardId}) RETURNING *;`;
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const token = req.params.id;
    const [{ id: deckId }] =
      await sql`SELECT id FROM decks WHERE user_id = ${token}`;
    const favorites =
      await sql`SELECT * FROM pokemon_cards WHERE deck_id = ${deckId};`;
    res.status(200).json({
      status: "success",
      favorites,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
