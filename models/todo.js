const {Schema, model} = require('mongoose')

const toDoSchema = new Schema({
    title: String, 
    completed: Boolean, 
})

const Todo = model('ToDo', toDoSchema)

module.exports= Todo