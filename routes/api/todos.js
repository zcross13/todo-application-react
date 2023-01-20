const express = require('express')
const router = express.Router()
const todoCtrl = require('../../controller/api/todos')

// Index /api/todos 
router.get('/', todoCtrl.indexNotComplete, todoCtrl.jsonTodos)
// Index /api/todos/completed
router.get('/completed', todoCtrl.indexComplete, todoCtrl.jsonTodos)
// Delete /api/todos/:id
router.delete('/:id', todoCtrl.destroy, todoCtrl.jsonTodo)
// Update /api/todos/:id  
router.put('/:id', todoCtrl.update, todoCtrl.jsonTodo)
// Create /api/todos  
router.post('/', todoCtrl.create, todoCtrl.jsonTodo)
// Show /api/todos/:id 
router.get('/:id', todoCtrl.show, todoCtrl.jsonTodo)

module.exports = router 

// const express = require('express')
// const router = express.Router()
// const { dataController, apiController } = require('../../controller/api/todos')

// // add routes
// // Index /api/todos
// router.get('/', dataController.index, apiController.index)
// // Delete /api/todos/:id
// router.delete('/:id', dataController.destroy, apiController.show)
// // Update /api/todos/:id
// router.put('/:id', dataController.update, apiController.show)
// // Create /api/todos
// router.post('/', dataController.create, apiController.show)
// // Show /api/todos/:id
// router.get('/:id', dataController.show, apiController.show)


// module.exports = router