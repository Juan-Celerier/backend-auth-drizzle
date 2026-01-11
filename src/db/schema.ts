import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("usuarios", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  rol: varchar("rol", { length: 50 }).default("user"),
  fechaCreacion: timestamp("fecha_creacion").defaultNow(),
});

export const schema = { users };
