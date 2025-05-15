import express from 'express';
import todoRouter from './router/todo.js';

// Konfigurering
const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
    
// Routes
app.use('/api/todos', todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});