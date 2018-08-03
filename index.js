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

const checkProjBody = (req, res, next) => {
    const proj = req.body;
    if (proj.name == null || proj.description == null) {
        res.status(400).json({ errorMessage: 'Please be sure to include a name and description for the project' })
    } else if (proj.name.length > 128) {
        res.status(400).json({ errorMessage: 'Please do not have a project name greater than 128 characters' })
    }
    next();
}

const checkActionBody = (req, res, next) => {
    const action = req.body;
    if (action.description == null || action.notes == null) {
        res.status(400).json({ errorMessage: 'Please be sure to include notes and a description for the action' })
    } else if (action.description.length > 128) {
        res.status(400).json({ errorMessage: 'Please do not have an action description greater than 128 characters' })
    }
    next();
}

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

server.post('/projects', checkProjBody, (req, res) => {
    const proj = req.body;

    projectsDb.insert(proj)
        .then(proj => {
            res.status(200).json(proj);
        })
        .catch(() => {
            serverErrorMsg();
        })
})

server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;

    projectsDb.remove(id)
        .then(response => {
            if (response < 1) {
                res.status(404).json({ message: 'the specified project could not be found' })
            }
            res.status(200).json(response);
        })
        .catch(() => {
            serverErrorMsg();
        })
})

server.put('/projects/:id', checkProjBody, (req, res) => {
    const { id } = req.params;
    const proj = req.body;

    projectsDb.update(id, proj)
        .then(response => {
            if (response == null) {
                res.status(404).json({ message: 'the project with the specified ID could not be found' })
            }
            res.status(200).json(proj);
        })
        .catch(() => {
            serverErrorMsg();
        })
})


// ===== ACTION REQUESTS =====

server.get('/actions/:id', (req, res) => {
    const { id } = req.params;

    actionsDb.get(id)
        .then(response => {
            if (response < 1) {
                res.status(404).json({ message: 'the actions with the specified ID could not be found' })
            }
            res.status(200).json(response);
        })
        .catch(() => {
            serverErrorMsg();
        }) 
})

server.post('/actions', checkActionBody, (req, res) => {
   const action = req.body;

   actionsDb.insert(action)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(() => {
        serverErrorMsg();
    })
})

server.delete('/actions/:id', (req, res) => {
    const { id } = req.params;

    actionsDb.remove(id)
        .then( response => {
            if (response < 1) {
                res.status(404).json({ message: 'The action with the specified ID could not be found' })
            }
            res.status(200).json(response);
        })
        .catch(() => {
            serverErrorMsg();
        })
})

server.put('/actions/:id', (req, res) => {
    const { id } = req.params;
    const action = req.body;

    actionsDb.update(id, action)
        .then( response => {
            if (response == null) {
                res.status(404).json({ message: 'The action with the specified ID could not be found ' })
            }
            res.status(200).json(action);
        })
        .catch(() => {
            serverErrorMsg();
        })
})


server.listen(8000, () => console.log('\n ===== API running... =====\n'))