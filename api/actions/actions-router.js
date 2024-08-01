const express = require('express')
const Actions = require('./actions-model')

const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve actions'})
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const action = await Actions.get(id)
        if (action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({ message: 'Action not found' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve action' })
    }
})

router.post('/', async (req, res) => {
    const { notes, description, project_id } = req.body
    if (!notes || !description || !project_id) {
        return res.status(400).json({ message: 'Missing required fields: notes, description, and project_id are required' })
    }
    try {
        const action = await Actions.insert(req.body)
        res.status(201).json(action)
    } catch (error) {
        res.status(500).json({ message: 'Failed to create action' })
    }
})

router.put('/:id', async (req,res) => {
    const { id } = req.params
    const { notes, description, completed, project_id } = req.body
    if (notes === undefined || description === undefined || completed === undefined || project_id === undefined) {
        return res.status(400).json({ message: 'Missing required fields: notes, description, completed, and project_id are required' })
    }
    try {
        const updatedAction = await Actions.update(id, req.body)
        if (updatedAction) {
            res.status(200).json(updatedAction)
        } else {
            res.status(404).json({ message: 'Action not found' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update action' })
    }
})

router.delete('/:id', async(req, res) => {
    const { id } = req.params
    try {
        const count = await Actions.remove(id)
        if (count > 0) {
            res.status(200).json({ message: 'Action deleted successfully' })
        } else {
            res.status(404).json({ message: 'Action not found' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete action' })
    }
})
module.exports = router 