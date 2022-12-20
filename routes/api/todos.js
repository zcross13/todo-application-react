const express = require('express')
const router = express.Router()
const { dataController, apiController } = require('../../controller/api/todos')

// add routes
// Index /api/todos
router.get('/', dataController.index, apiController.index)
// Delete /api/todos/:id
router.delete('/:id', dataController.destroy, apiController.show)
// Update /api/todos/:id
router.put('/:id', dataController.update, apiController.show)
// Create /api/todos
router.post('/', dataController.create, apiController.show)
// Show /api/todos/:id
router.get('/:id', dataController.show, apiController.show)


module.exports = router