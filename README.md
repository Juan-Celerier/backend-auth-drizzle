# 🔐 Backend Auth Drizzle - Microservicio de Autenticación

Microservicio de autenticación para el Dashboard de Finanzas, desarrollado con Node.js, Express, Drizzle ORM y PostgreSQL. Gestiona registro, login y autenticación JWT de usuarios.

## 📋 Descripción

Servicio backend que proporciona:

- ✅ **Registro de usuarios** con validación
- ✅ **Autenticación JWT** con tokens seguros
- ✅ **Hashing de contraseñas** con bcrypt
- ✅ **Gestión de roles** de usuario
- ✅ **Base de datos compartida** con el microservicio de finanzas
- ✅ **Migraciones automáticas** con Drizzle

## 🏗️ Stack Tecnológico

- **Node.js** + **Express** + **TypeScript**
- **PostgreSQL** + **Drizzle ORM**
- **JWT** para autenticación
- **bcrypt** para hashing de contraseñas
- **CORS** para comunicación segura
- **dotenv** para variables de entorno

## 📁 Estructura del Proyecto

```
backend-auth-drizzle/
├── 📁 src/
│   ├── 📁 controllers/          # Controladores de autenticación
│   │   └── auth-controllers.ts  # Lógica de auth (register, login, me)
│   ├── 📁 db/                   # Configuración de base de datos
│   │   ├── index.ts             # Conexión Drizzle
│   │   └── schema.ts            # Schema de usuarios
│   ├── 📁 middlewares/          # Middlewares
│   │   └── authMiddleware.ts    # Verificación JWT
│   └── index.ts                 # Servidor Express principal
├── 📁 drizzle/                  # Migraciones Drizzle
│   ├── 0000_warm_dragon_lord.sql # SQL de migraciones
│   └── meta/                    # Metadatos de migraciones
├── 📄 postman_collection.json   # Colección Postman
├── 📄 package.json
├── 📄 drizzle.config.ts         # Configuración Drizzle
├── 📄 tsconfig.json             # Configuración TypeScript
├── 📄 .env.example              # Variables de entorno ejemplo
└── 📄 README.md                 # Esta documentación
```

## 🚀 Guía de Instalación y Ejecución

### 📋 Prerrequisitos

- **Node.js** versión 18.0.0 o superior
- **PostgreSQL** versión 15.0 o superior
- **npm** o **yarn** como gestor de paquetes
- **Git** para control de versiones

### 🔧 Configuración para Desarrollo

#### Paso 1: Clonar e Instalar
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd backend-auth-drizzle

# Instalar dependencias
npm install
```

#### Paso 2: Configurar Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con credenciales locales
DATABASE_URL=postgres://usuario:password@localhost:5432/db_finanzas
JWT_SECRET=mi_clave_jwt_desarrollo_segura_2024
PORT=3001
```

#### Paso 3: Configurar Base de Datos
```bash
# Crear base de datos PostgreSQL
createdb db_finanzas

# O usando Docker
docker run --name postgres-auth \
  -e POSTGRES_DB=db_finanzas \
  -e POSTGRES_USER=usuario \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 -d postgres:15
```

#### Paso 4: Ejecutar Migraciones
```bash
# Aplicar schema a la base de datos
npm run db:push
```

#### Paso 5: Ejecutar en Desarrollo
```bash
# Iniciar servidor con hot reload
npm run dev

# Servidor disponible en: http://localhost:3001
```

#### Paso 6: Verificar Instalación
```bash
# Probar endpoint de health check
curl http://localhost:3001/auth/me

# Debería retornar error 401 (no autorizado) sin token
```

### 🏭 Configuración para Producción - Deploy en Render

#### Opción 1: Deploy Automático desde Git (Recomendado)

1. **Crear cuenta en Render**
   - Ir a [render.com](https://render.com) y crear cuenta
   - Conectar con GitHub

2. **Crear Servicio Web**
   - Click en "New" → "Web Service"
   - Seleccionar repositorio `backend-auth-drizzle`
   - **Runtime**: Node.js
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 18.x

3. **Configurar Base de Datos en Render**
   - Crear PostgreSQL database en Render
   - Copiar la `DATABASE_URL` proporcionada

4. **Configurar Variables de Entorno**
   ```
   DATABASE_URL=postgres://usuario:password@host:port/db_finanzas
   JWT_SECRET=tu_clave_jwt_produccion_muy_segura_2024
   PORT=10000  # Render asigna puerto automáticamente
   NODE_ENV=production
   ```

5. **Deploy**
   - Render hará build y deploy automático
   - La URL será algo como: `https://backend-auth-drizzle.onrender.com`

#### Opción 2: Deploy Manual

```bash
# 1. Build para producción
npm run build

# 2. El código compilado estará en dist/
# 3. Subir a servidor con Node.js
# 4. Configurar PM2 o similar para mantener corriendo
npm install -g pm2
pm2 start dist/index.js --name auth-service
```

### 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor con tsx (hot reload)
npm run build        # Compilar TypeScript
npm start            # Servidor de producción

# Base de datos
npm run db:push      # Aplicar cambios de schema
npm run db:studio    # Abrir Drizzle Studio (opcional)

# Utilidades
npm run lint         # Ejecutar ESLint (si configurado)
npm run type-check   # Verificar tipos TypeScript
```

### 📡 API Endpoints

Todos los endpoints devuelven JSON. Los errores incluyen código HTTP apropiado y mensaje descriptivo.

#### POST /auth/register
Registra un nuevo usuario en el sistema.

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "rol": "user"
}
```

**Respuesta Exitosa (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "rol": "user"
  }
}
```

#### POST /auth/login
Autentica un usuario y devuelve token JWT.

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Respuesta Exitosa (200):**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "rol": "user"
  }
}
```

#### GET /auth/me
Obtiene información del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta Exitosa (200):**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "rol": "user",
  "fecha_creacion": "2024-01-15T10:30:00Z"
}
```

### 🔒 Seguridad Implementada

- ✅ **JWT Authentication**: Tokens con expiración de 8 horas
- ✅ **Password Hashing**: bcrypt con salt rounds
- ✅ **Input Validation**: Sanitización y validación de datos
- ✅ **CORS**: Configurado para orígenes específicos
- ✅ **Rate Limiting**: Protección contra ataques de fuerza bruta
- ✅ **SQL Injection Protection**: Drizzle ORM previene inyección
- ✅ **Environment Variables**: Secrets no hardcodeados

### 📊 Modelo de Datos

#### Tabla Usuarios
```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  rol VARCHAR(50) DEFAULT 'user',
  fecha_creacion TIMESTAMP DEFAULT NOW()
);

-- Índices para optimización
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_rol ON usuarios(rol);
```

**Campos:**
- `id`: Identificador único (auto-incremental)
- `nombre`: Nombre completo del usuario
- `email`: Email único (usado para login)
- `password`: Contraseña hasheada con bcrypt
- `rol`: Rol del usuario (user, admin, etc.)
- `fecha_creacion`: Timestamp de creación

### 🧪 Testing con Postman

#### Importar Colección
1. Abrir Postman
2. Importar `postman_collection.json`
3. Configurar variables de entorno:
   - `base_url`: `http://localhost:3001` (desarrollo) o URL de Render (producción)

#### Flujo de Testing
1. **POST /auth/register** - Registrar usuario
2. **POST /auth/login** - Obtener token
3. **GET /auth/me** - Verificar autenticación (usar token en headers)

### 🤝 Integración con Otros Servicios

Este microservicio se integra con:

- **Backend Finanzas**: Comparte base de datos PostgreSQL
- **Frontend**: Proporciona autenticación JWT
- **Base de datos**: PostgreSQL compartida con finanzas

**Nota**: Los JWT_SECRET deben ser idénticos en ambos backends para que los tokens sean válidos.

### 📞 Soporte y Troubleshooting

#### Problemas Comunes

**Error de conexión a PostgreSQL:**
```bash
# Verificar credenciales
cat .env | grep DATABASE_URL

# Probar conexión
psql "postgres://usuario:password@localhost:5432/db_finanzas" -c "SELECT 1;"

# Para Render: verificar DATABASE_URL en panel de control
```

**Migraciones fallidas:**
```bash
# Revertir y re-aplicar
npm run db:push

# Verificar schema aplicado
psql "DATABASE_URL" -c "\dt"
```

**Errores de JWT:**
```bash
# Verificar JWT_SECRET
echo $JWT_SECRET

# Probar token decode (usando jwt.io o similar)
```

**Problemas de CORS:**
- Verificar que el origen del frontend esté permitido
- Para desarrollo: agregar `http://localhost:5173`
- Para producción: agregar URL de Netlify

#### Logs en Render
- Acceder al panel de Render
- Ver sección "Logs" del servicio
- Buscar errores de conexión o runtime

### 📋 Checklist de Deploy en Render

- [ ] Repositorio conectado a Render
- [ ] Servicio web creado
- [ ] Base de datos PostgreSQL configurada
- [ ] Variables de entorno establecidas
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm start`
- [ ] Puerto automático habilitado
- [ ] HTTPS habilitado automáticamente
- [ ] Dominio personalizado (opcional)

### 🎉 Conclusión

Este microservicio proporciona una autenticación robusta y segura para el sistema Dashboard de Finanzas. Implementa las mejores prácticas de seguridad y está optimizado para deploy en Render con configuración automática.

**¡Listo para desarrollo local y deploy automático en Render!**

---

**Desarrollado con ❤️ como parte del sistema de microservicios Dashboard de Finanzas**
