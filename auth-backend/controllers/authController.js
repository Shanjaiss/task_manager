import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//REGISTER
export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const v_sql = `
      SELECT name, email, password
      FROM users
      WHERE email = $1
    `;

    const v_values = [email];

    const v_results = await db.query(v_sql, v_values);

    if (Array.isArray(v_results) && v_results.length > 0) {
      return res.status(400).json({ message: 'User Already Exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const v_sql_1 = `
      INSERT INTO users(name, email, password)
      VALUES($1, $2, $3)
    `;
    await db.query(v_sql_1, [name, email, hashedPassword]);

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//LOGIN

export const Login = async (req, res) => {
  const { email, password } = req.body;

  const v_sql_2 = `
    SELECT 1
    FROM users
    WHERE email = $1
  `;
  const v_values = [email];

  const v_results = await db.query(v_sql_2, v_values);

  if (Array.isArray(v_results) && v_results.length > 0) {
    for (const v_row of v_results) {
      const isMatch = await bcrypt.compare(password, v_row.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: v_row.id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.json({ token, user });
    }
  } else {
    return res.status(400).json({ message: 'Invalid Credentials' });
  }
};
