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


// ===== ACTION REQUESTS =====



server.listen(8000, () => console.log('\n ===== API running... =====\n'))