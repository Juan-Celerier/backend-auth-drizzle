# Backend Auth Drizzle

Microservicio de autenticación para el Dashboard de Finanzas, utilizando Drizzle ORM con PostgreSQL.

## Stack Tecnológico
- Node.js + Express
- PostgreSQL + Drizzle ORM
- TypeScript
- JWT para autenticación
- bcrypt para hashing de contraseñas

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd backend-auth-drizzle
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con:
   ```
   DATABASE_URL=postgres://tu_usuario:tu_password@localhost:5432/db_finanzas
   JWT_SECRET=tu_clave_secreta_aqui
   PORT=3001
   ```

4. Configura la base de datos PostgreSQL:
   - Crea una base de datos llamada `db_finanzas`
   - Asegúrate de que PostgreSQL esté corriendo en localhost:5432

5. Ejecuta las migraciones para crear las tablas:
   ```bash
   npm run db:push
   ```

## Ejecución

Para desarrollo:
```bash
npm run dev
```

El servidor se iniciará en http://localhost:3001

## Endpoints

### POST /auth/register
Registra un nuevo usuario.

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "rol": "user"
}
```

### POST /auth/login
Autentica un usuario y devuelve un token JWT.

**Body:**
```json
{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET /auth/me
Obtiene la información del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "rol": "user"
}
```

## Colección de Postman

Importa el archivo `postman_collection.json` en Postman para probar los endpoints. La colección incluye variables para la URL base y el token de autenticación.

## Modelo de Datos

### Tabla Usuarios
- id: serial (primary key)
- nombre: text (not null)
- email: varchar(255) (not null, unique)
- password: text (not null, hashed)
- rol: varchar(50) (default 'user')
- fecha_creacion: timestamp (default now)

## Notas
- Las contraseñas se hashean automáticamente con bcrypt.
- Los tokens JWT expiran en 8 horas.
- El microservicio comparte la base de datos con el microservicio de ventas/gastos, pero no depende directamente de él.
