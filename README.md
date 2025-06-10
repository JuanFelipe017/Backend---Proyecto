# Backend - Proyecto Computacion en la Nube 

Este repositorio contiene el **backend** de la aplicación de películas, encargado de la autenticación y gestión de usuarios.

## 🚀 Tecnologías utilizadas
- Node.js
- Express.js
- PostgreSQL
- bcryptjs

## 📦 Dependencias principales

- **axios**: Cliente HTTP para realizar peticiones externas.
- **bcryptjs**: Para hashear contraseñas.
- **cors**: Permite el intercambio de recursos entre distintos orígenes.
- **dotenv**: Manejo de variables de entorno.
- **express**: Framework para aplicaciones web en Node.js.
- **express-validator**: Validaciones de datos en las rutas.
- **jsonwebtoken**: Autenticación basada en tokens JWT.
- **morgan**: Logger de peticiones HTTP.
- **pg**: Cliente de PostgreSQL para Node.js.
- **nodemon** (dev): Reinicia automáticamente el servidor en desarrollo.

## 📦 Estructura

- `app/`: Archivos de la aplicación (index.js, db.js).
- `.env`: Variables de entorno (no olvides agregar tus credenciales de base de datos).
- `package.json`: Dependencias del proyecto.

## ⚙️ Requisitos

- Node.js 18+
- PostgreSQL
- Un archivo `.env` con la configuración de tu base de datos, ejemplo:
  ```
  DB_USER=tu_usuario
  DB_PASSWORD=tu_contraseña
  DB_HOST=ip_de_tu_ec2
  DB_PORT=5432
  DB_DATABASE=nombre_de_tu_bd
  ```

## ☁️ Infraestructura y Base de Datos

- **Base de datos**: El proyecto utiliza una base de datos PostgreSQL alojada en un servidor EC2 de AWS.
- **Creación y gestión**: Se utilizó DBeaver como cliente para la creación y administración de la base de datos, usuarios y tablas.
- **Conexión**: Los datos de conexión (host, usuario, contraseña, etc.) deben configurarse en el archivo `.env`.
- **Acceso seguro**: Asegúrate de que el puerto de PostgreSQL esté abierto en tu instancia EC2 y de usar credenciales seguras.

## 🛠️ Instalación y uso

1. Clona este repositorio:
   ```bash
   git clone https://github.com/JuanFelipe017/Backend---Proyecto
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea el archivo `.env` y configura tus variables de entorno (ver sección Requisitos).
4. Corre el servidor:
   ```bash
   npm start
   ```
5. El backend estará disponible en `http://localhost:4000` (o en la URL pública de tu EC2).

## 🧑‍💻 Endpoints principales

- `POST /api/register`: Registro de usuario.
- `POST /api/login`: Login de usuario.
- `GET /api/testdb`: Prueba de conexión a la base de datos.

## 📚 Enlaces útiles

- [Repositorio Frontend](https://github.com/JuanFelipe017/Frontend---Proyecto)