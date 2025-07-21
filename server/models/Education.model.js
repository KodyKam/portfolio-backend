/*server/models/Education.model.js*/
import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  completion: {
    type: Date,
    required: true
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Education', educationSchema);