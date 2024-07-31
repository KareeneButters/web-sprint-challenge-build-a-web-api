const express = require('express')
const Projects = require('./projects-model')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get()
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({ message: "Error getting projects", error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try{
     const projectId = req.params.id
     const projects = await Projects.get(projectId)
     if(!projects) {
        return res.status(404).json({ message: "no project with given id" })
     }
     res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post('/', async (req, res) => {
    try{
        const newProject = req.body

        if(!newProject || !newProject.name || !newProject.description) {
            return res.status(400).json({ message: "Missing required fields" })
        }
        const project = await Projects.insert(newProject)
        res.status(201).json(project)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

router.put('/:id', async(req, res) => {
    try {
        const projectId = req.params.id
        const updatedProject = req.body

        if (!updatedProject || !updatedProject.name || !updatedProject.description || typeof updatedProject.completed !== 'boolean') {
            return res.status(400).json({ message: "Missing required fields or invalid data" })
        }
        const project = await Projects.update(projectId, updatedProject)
        if (!project) {
            return res.status(404).json({ message: "Project not found" })
        }
        res.status(200).json(project)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const projectId = req.params.id
        const count = await Projects.remove(projectId)
        if (count > 0) {
            res.status(204).end() 
        } else {
            res.status(404).json({ message: "Project not found" })
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router