CREATE TABLE "generations" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"region" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pokemon" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"height" integer NOT NULL,
	"weight" integer NOT NULL,
	"base_experience" integer,
	"types" jsonb NOT NULL,
	"stats" jsonb NOT NULL,
	"sprites" jsonb NOT NULL,
	"abilities" jsonb NOT NULL,
	"cry" text NOT NULL,
	"generation_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pokemon" ADD CONSTRAINT "pokemon_generation_id_generations_id_fk" FOREIGN KEY ("generation_id") REFERENCES "public"."generations"("id") ON DELETE no action ON UPDATE no action;