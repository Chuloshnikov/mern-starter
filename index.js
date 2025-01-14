const express = require("express");
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();

const { Task } = require('./models/taskModel');

dotenv.config();

const port = process.env.PORT || 8080;

connectDB();

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello server!');
});


//GET All


app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
    } catch (error) {
        console.error('Some error');
        return res.status(500).json({ error: error.message })
    }
});

//GET COMPLETED

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({
            isCompleted: true
        });
        return res.status(200).json(tasks);
    } catch (error) {
        console.error('Some error');
        return res.status(500).json({ error: error.message })
    }
});

//GET ONE WITH SOME PARAMETER
{/*
    $eq - equil
    $ne - not equil
    $gt - greather then
    $lt - lower then
    $gte - greather then equil
    $in - любой из указанных в массиве
    $nin - не сответствует ни одному из указанного массива


    end, or, not - логические
*/}

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({
            $eq: ['$text', 'Go to cafe'],
        });
        return res.status(200).json(tasks);
    } catch (error) {
        console.error('Some error');
        return res.status(500).json({ error: error.message })
    }
});



app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({
            isCompleted: true
        });
        return res.status(200).json(tasks);
    } catch (error) {
        console.error('Some error');
        return res.status(500).json({ error: error.message })
    }
});

//GET ONE BY ID

app.get('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findById(taskId);
        if (!task) {
            res.status(404).json({ message: 'Task not found'});
        }

        return res.status(200).json(task);
    } catch (error) {
        console.error('Task not found');
        return res.status(500).json({ error: error.message })
    }
    

});


//POST

app.post('/tasks', async (req, res) => {
    try {
        const newTask = req.body;

        const task = await Task.create({
            text: newTask.text,
        });

        if (!task) {
            res.status(404).json({ message: 'Tasks not found'});
        }

        return res.status(201).json(task);
    } catch (error) {
        console.error('Task creation error: ', error);
        return res.status(500).json({ error: error.message })
    }   
});


//PUT

app.put('/tasks/:id', async (req, res) => {
    try {
        const { text, isCompleted } = req.body;
        const taskId = req.params.id;

        const task = await Task.findByIdAndUpdate(taskId, {text, isCompleted}, {new: true});

        if (!task) {
            res.status(404).json({ message: 'Task not found'});
        }
        return res.status(200),json(task);
    } catch (error) {
        console.error('Task creation error: ', error);
        return res.status(500).json({ error: error.message })
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            res.status(404).json({ message: 'Task not found'});
        }

        return res.status(204).send();
    } catch (error) {
        console.error('Task deleting error: ', error);
        return res.status(500).json({ error: error.message })
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});