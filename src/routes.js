import { randomUUID } from 'node:crypto';

import { Router } from 'express';

const router = Router();

const tasks = [];

router.get('/tasks', (req, res) => {
  const { title, description } = req.query;

  if (title || description) {
    const searchedTasks = tasks.filter((task) => {
      if (task.title == title || task.description == description) {
        return task;
      }
    });

    res.status(200);
    res.send(searchedTasks);
  }

  res.status(200);
  res.send(tasks);
});

router.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  if (title && description) {
    const task = {
      id: randomUUID(),
      title,
      description,
      created_at: new Date(),
      updated_at: null,
      completed_at: null,
    }
  
    tasks.push(task);

    res.status(201);
    res.send({ message: 'Task created successfully.'});

    return;
  }

  res.status(400);
  res.send({ message: 'Miss required prop.'});
});

router.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  tasks.forEach((task) => {
    if (task.id === id) {
      task.description = description || task.description;
      task.title = title || task.title;
      task.updated_at = new Date();

      res.status(200);
      res.send({ message: 'Task updated successfully' });
      return;
    }
  });

  res.status(400);
  res.send({ message: 'ID not found' });
});

router.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;

  const index = tasks.findIndex(task => task.id === id);

  if (index > -1) {
    tasks.splice(index, 1);

    res.status(200);
    res.send({ message: 'Task deleted successfully' });
  }

  res.status(400);
  res.send({ message: 'ID not found' });
  
});

router.patch('/tasks/:id/complete', (req, res) => {
  const { id } = req.params;

  tasks.forEach((task) => {
    if (task.id === id) {
      task.completed_at = task.completed_at ? null : new Date();

      res.status(200);
      res.send({ message: 'Task completed successfully' });
      return;
    }
  });

  res.status(400);
  res.send({ message: 'ID not found' });
});

export { router };