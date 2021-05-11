const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: false,
  },
  courseDescription: {
    type: String,
    required: false,
  },
  coursePrerequisite: {
    type: String,
    required: false,
  },
  courseWeek1: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  fileName:{
    type: String,
    required: false,
    default:''
  },
  pdfName:{
    type: String,
    required:false,
    default:''
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Course', CourseSchema)