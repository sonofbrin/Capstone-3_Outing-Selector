BEGIN TRANSACTION;

DROP TABLE IF EXISTS favorite;
DROP TABLE IF EXISTS outing_guest;
DROP TABLE IF EXISTS restaurant_tag;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS outing_restaurant;
DROP TABLE IF EXISTS restaurant;
DROP TABLE IF EXISTS outing;
DROP TABLE IF EXISTS users;
DROP SEQUENCE IF EXISTS seq_user_id;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;


CREATE TABLE users (
	user_id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	username varchar(50) NOT NULL,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

CREATE TABLE restaurant (
    id serial,
    name varchar(250) NOT NULL,
    address varchar(250) NOT NULL,
    city varchar(250) NOT NULL,
    state varchar(250) NOT NULL,
    zip varchar(15) NOT NULL,
    CONSTRAINT PK_restaurant PRIMARY KEY(id)
);

CREATE TABLE outing (
    id serial,
    inviter_id int,
    date_time timestamp NOT NULL,
    decision_time timestamp NOT NULL,
    CONSTRAINT PK_outing PRIMARY KEY(id),
    CONSTRAINT FK_outing_user FOREIGN KEY(inviter_id) REFERENCES users(user_id)
);

CREATE TABLE outing_restaurant (
    id serial,
    outing_id int,
    restaurant_id int,
    upvotes int NOT NULL,
    downvotes int NOT NULL,
    CONSTRAINT PK_outing_restaurant PRIMARY KEY(id),
    CONSTRAINT FK_outing_restaurant_outing FOREIGN KEY(outing_id) REFERENCES outing(id)
);

CREATE TABLE tag (
    id serial,
    name varchar(250),
    CONSTRAINT PK_tag PRIMARY KEY(id)
);

CREATE TABLE restaurant_tag (
    id serial,
    restaurant_id int,
    tag_id int,
    CONSTRAINT PK_restaurant_tag PRIMARY KEY(id),
    CONSTRAINT FK_restaurant_tag_restaurant FOREIGN KEY(restaurant_id) REFERENCES restaurant(id),
    CONSTRAINT FK_restaurant_tag_tag FOREIGN KEY(tag_id) REFERENCES tag(id)
);

CREATE TABLE outing_guest (
    id serial,
    outing_id int,
    guest_email varchar(100) UNIQUE,
    CONSTRAINT PK_outing_guest PRIMARY KEY(id),
    CONSTRAINT FK_outing_guest_outing FOREIGN KEY(outing_id) REFERENCES outing(id)
);

CREATE TABLE favorite (
    id serial,
    user_id int,
    restaurant_id int,
    CONSTRAINT PK_favorite PRIMARY KEY(id),
    CONSTRAINT FK_favorite_user FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT FK_favorite_restaurant FOREIGN KEY(restaurant_id) REFERENCES restaurant(id)
);

INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');


COMMIT TRANSACTION;
