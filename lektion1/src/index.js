
const express = require('express');
const app = express();

app.use(express.json()); // Middelware to automatically pars JSON

let todos = [ // Initialize our "in memory database"
    { id: 1, task: "Learn node.js", completed: false },
    { id: 2, task: "Learn express", completed: false},
    { id: 3, task: "Build a REST API", completed: false}
];

app.get('/todos', (req, res) => {
    res.json(todos); // Send the todo list of todos to the client as json
});

app.get('/todos/:id', (req, res) => {
    // const todoId
    const todoId = paresInt(req.params.id);

    const todo = todos.find((rad) => {
        return rad.id === todoId;
    });

    if(todo) {
        res.json(todo);
    } else {
        res.status(404).json({
            message: "Todo not found"
        });
    }
});

app.post('/todos', (req, res) => {
    // req.body.todo todo beskrivning

    const nextId = todos.reduce ((maxId, rad) => {
        return Math.max(maxId, rad.id);
    }, 0) +1;

    const newTodo = {
        id: nextId,
        task: req.body.task ,
        completed: req.body.completed
    };

    todos.push(newTodo);
    res.status(200).json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    todos = todos.filter( (rad) => {  // Filter the result - - e.g. keep all rows that doesn-t match
        return rad.id !== todoId
    });
    res.status(204).send();
});


// app.listen har man altid längst ner
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`); // Använda backticks vs singelfnuttar?
})