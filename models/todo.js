const {Schema, model} = require('mongoose')

const toDoSchema = new Schema({
    text: String, 
    completed: Boolean, 
})

const Todo = model('ToDo', toDoSchema)

module.exports= Todo