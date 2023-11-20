CREATE TABLE "listStatus" (
  "id" integer PRIMARY KEY,
  "nameStatus" string,
  "created_at" timestamp
);

CREATE TABLE "listTask" (
  "id" integer PRIMARY KEY,
  "title" string,
  "description" string,
  "subtasks" string,
  "comments" string,
  "startDate" date,
  "revisionDate" date,
  "endDate" date,
  "idStatus" integer,
  "created_at" timestamp
);

ALTER TABLE "listTask" ADD FOREIGN KEY ("idStatus") REFERENCES "listStatus" ("id");
