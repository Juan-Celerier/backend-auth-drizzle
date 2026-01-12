# Backend Auth Drizzle

Microservicio de autenticación con Drizzle ORM para gestión de usuarios y JWT.

## Stack

- Node.js + Express + TypeScript
- PostgreSQL + Drizzle ORM
- JWT + bcrypt
- Puerto: 3001

## Endpoints

- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Login con JWT
- `GET /auth/me` - Obtener usuario actual

## Instalación Desarrollo

1. **Instalar**: `npm install`
2. **Configurar .env**:
   ```env
   DATABASE_URL=postgres://user:pass@localhost:5432/db_finanzas
   JWT_SECRET=tu_clave_segura
   PORT=3001
   ```
3. **Migraciones**: `npm run db:push`
4. **Ejecutar**: `npm run dev`

## Producción - Render

**URL Deploy**: https://backend-auth-drizzle-magg.onrender.com

```bash
# Crear Web Service en Render
# Build: npm install
# Start: npm start
# Variables configuradas: DATABASE_URL, JWT_SECRET, PORT
```

## Pruebas

Usa Postman o curl para probar los endpoints:

```bash
# 1. Registrar usuario
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan","email":"juan@test.com","password":"123456"}'

# 2. Login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@test.com","password":"123456"}'

# 3. Obtener usuario (con token)
curl -H "Authorization: Bearer TU_TOKEN_JWT" \
  http://localhost:3001/auth/me
```

## Características

- Registro y login de usuarios
- JWT con expiración
- Hashing de contraseñas con bcrypt
- Validación de datos
- Base de datos compartida con finanzas
