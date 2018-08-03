const express = require('express');
const server = express();

const projectsDb = require('./data/helpers/projectModel.js');
const actionsDb = require('./data/helpers/actionModel.js');

server.use(express.json());

// ===== ERROR MIDDLEWARE =====

const serverErrorMsg = () => {
    res.status(500).json({ error: 'SERVER ERROR!' })
}

// ===== MIDDLEWARE =====


// ===== PROJECT REQUESTS =====

server.get('/projects', (req, res) => {
    projectsDb.get()
        .then( response => {
            res.status(200).json(response)
        })
        .catch(() => {
            serverErrorMsg();
        })
})

server.get('/projects/:id', (req, res) => {
    const { id } = req.params;

    projectsDb.get(id)
        .then(response => {
            if (response.length == 0) {
                res.status(404).json({ message: 'The specified project could not be found' })
            }
            res.status(200).json(response)
        })
        .catch(() => {
            serverErrorMsg();
        })
})


// ===== ACTION REQUESTS =====



server.listen(8000, () => console.log('\n ===== API running... =====\n'))