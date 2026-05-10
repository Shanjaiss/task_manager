import db from '../config/db.js';
export const GetTodos = async (req, res) => {
  try {
    const sql = `
      SELECT id, title, description, status
      FROM todo_apps
      ORDER BY id DESC
    `;

    const { rows } = await db.query(sql);

    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Something went wrong',
    });
  }
};

export const CreateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // ✅ Basic validation
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const sql = `
      INSERT INTO todo_apps (title, description, status)
      VALUES ($1, $2, $3)
    `;

    await db.query(sql, [title, description || '', 'todo']);

    res.status(201).json({
      message: 'Todo Created Successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Something went wrong',
    });
  }
};
