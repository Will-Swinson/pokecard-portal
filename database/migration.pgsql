DROP TABLE IF EXISTS decks,users, pokemon_cards;


CREATE TABLE users
(
  id       serial NOT NULL,
  username TEXT   NOT NULL,
  password TEXT   NOT NULL,
  email    TEXT   NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE decks
(
  id                serial  NOT NULL,
  title             text    ,
  created           date    ,
  public_or_private boolean ,
  last_modified     date    ,
  user_id           INT  NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  PRIMARY KEY (id)
);

CREATE TABLE pokemon_cards
(
  deck_id INT NOT NULL,
  card_id     TEXT NOT NULL,
  FOREIGN KEY (deck_id) REFERENCES decks (id),
  PRIMARY KEY (deck_id, card_id)
);
