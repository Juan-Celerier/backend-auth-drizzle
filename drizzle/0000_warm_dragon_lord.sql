CREATE TABLE "usuarios" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"rol" varchar(50) DEFAULT 'user',
	"fecha_creacion" timestamp DEFAULT now(),
	CONSTRAINT "usuarios_email_unique" UNIQUE("email")
);
