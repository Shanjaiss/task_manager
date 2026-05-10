import db from '../config/db.js';
const allowedStatuses = ['todo', 'inProgress', 'testing', 'completed'];
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
      message: 'Something went wrong',
    });
  }
};

export const UpdateTodoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const todoId = Number(id);

    if (Number.isNaN(todoId)) {
      return res.status(400).json({ message: 'Invalid todo id' });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const sql = `
      UPDATE todo_apps
      SET status = $1
      WHERE id = $2
      RETURNING id, title, description, status
    `;

    const { rows } = await db.query(sql, [status, todoId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({
      message: 'Todo status updated',
      todo: rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Something went wrong',
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
