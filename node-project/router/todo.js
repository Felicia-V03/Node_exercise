import { Router } from 'express';
import { todos } from '../data/todos.js';

const router = Router();

// GET todo
router.get('/', (req, res) => {
  res.json(todos);
});

// GET todo by id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    res.json(todo);
  }else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// // GET /api/todos?search=...
// router.get('/', (req, res) => {
//   const { search } = req.query;

//   if (search) {
//     const filtered = todos.filter(todo =>
//       todo.title.toLowerCase().includes(search.toLowerCase())
//     );
//     res.json(filtered);
//   } else {
//     res.json(todos); // Returnera alla om ingen sökterm finns
//   }
// });

// POST new todo
router.post('/', (req, res) => {
  const { title } = req.body;
  if (title) {
    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } else {
    res.status(400).json({ message: 'Title is required' });
  }
});

// PUT update todo by id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// DELETE todo by id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

export default router;