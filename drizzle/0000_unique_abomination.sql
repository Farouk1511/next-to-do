CREATE TABLE IF NOT EXISTS "todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"progress" text,
	"created_at" timestamp DEFAULT now()
);
