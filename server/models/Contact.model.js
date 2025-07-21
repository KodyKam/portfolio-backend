//server/models/Contact.model.js
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Contact', ContactSchema);