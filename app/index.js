import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { pool } from './db.js';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.set('port', 4000);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/login.html'));
});


// Ruta para obtener el formulario de registro

app.post('/api/register', async (req, res) => {
  const { name, username, email, cell, password } = req.body;

  // Validación para llenar todos los campos
  if (!name || !username || !email || !cell || !password) {
    return res.status(400).json({ success: false, message: 'Faltan campos' });
  }

   try {
    // Hashea la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserta el usuario en la base de datos
    const result = await pool.query(
      'INSERT INTO bd.usuario (name, username, password, email, cell) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [name, username, hashedPassword, email, cell]
    );
    res.json({ success: true, userId: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al registrar usuario', error: error.message });
  }
});

// Ruta para obtener el formulario de ingreso
// Verifica si el usuario existe y la contraseña es correcta

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM bd.usuario WHERE username = $1 OR email = $1',
      [username]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos.' });
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos.' });
    }
    res.json({ success: true, message: 'Inicio de sesión exitoso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error en el login.' });
  }
});

// Comprobar si hay conexión con el cmd 
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});

// Ruta para probar la conexión a la base de datos
app.get('/api/testdb', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});