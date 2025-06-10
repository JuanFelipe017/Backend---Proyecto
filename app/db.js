import dotenv from 'dotenv';
dotenv.config();

// creación de la conexión a la base de datoss
import pkg from 'pg';
const { Pool } = pkg;
export const pool = new Pool();