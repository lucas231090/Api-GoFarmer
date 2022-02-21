CREATE DATABASE myfarms;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories(
 id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
 name VARCHAR NOT NULL
);


CREATE TABLE IF NOT EXISTS farms(
 id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
 name VARCHAR NOT NULL,
 description VARCHAR,
 category_id UUID,
 FOREIGN KEY (category_id) REFERENCES categories(id)
);
