

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors=require('cors')
// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(cors())
// let tasks = []; // Initialize empty array

// app.get('/tasks', (req, res) => {
//   res.json(tasks);
// });

// app.post('/tasks', (req, res) => {
//   const newTask = req.body;
//   newTask.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
//   tasks.push(newTask);
//   res.status(201).json(newTask); // Created status code
// });

// app.put('/tasks/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const updatedTask = req.body;
//   const index = tasks.findIndex(task => task.id === id);

//   if (index !== -1) {
//     tasks[index] = updatedTask;
//     res.json(tasks[index]);
//   } else {
//     res.status(404).json({ message: 'Task not found' });
//   }
// });

// app.delete('/tasks/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = tasks.findIndex(task => task.id === id);

//   if (index !== -1) {
//     tasks.splice(index, 1);
//     res.status(204).end(); // No content on successful deletion
//   } else {
//     res.status(404).json({ message: 'Task not found' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const tasksFilePath = './tasks.json';

// Function to read tasks from file
const readTasksFromFile = () => {
  const data = fs.readFileSync(tasksFilePath);
  return JSON.parse(data);
};

// Function to write tasks to file
const writeTasksToFile = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

app.get('/tasks', (req, res) => {
  const tasks = readTasksFromFile();
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const tasks = readTasksFromFile();
  const newTask = req.body;
  newTask.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
  tasks.push(newTask);
  writeTasksToFile(tasks);
  res.status(201).json(newTask); // Created status code
});

app.put('/tasks/:id', (req, res) => {
  const tasks = readTasksFromFile();
  const id = parseInt(req.params.id);
  const updatedTask = req.body;
  const index = tasks.findIndex(task => task.id === id);

  if (index !== -1) {
    updatedTask.id = id; // Ensure the id remains unchanged
    tasks[index] = updatedTask;
    writeTasksToFile(tasks);
    res.json(tasks[index]);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const tasks = readTasksFromFile();
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
    writeTasksToFile(tasks);
    res.status(204).end(); // No content on successful deletion
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
