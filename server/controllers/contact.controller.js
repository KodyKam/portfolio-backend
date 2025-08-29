// server/controllers/contact.controller.js
import Contact from '../models/Contact.model.js';
import nodemailer from 'nodemailer';

// Create contact (only sends email to you)
export const createContact = async (req, res) => {
  try {
    const { firstname, lastname, age, contactNumber, email, message } = req.body;

    // Basic validation
    if (!firstname || !lastname || !email || !message) {
      return res.status(400).json({ error: "Firstname, lastname, email, and message are required." });
    }

    // 1. Save contact to MongoDB
    const contact = new Contact(req.body);
    await contact.save();

    // 2. Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Email to you (owner)
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER, // always your Gmail
      subject: `📩 New Contact: ${firstname} ${lastname}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${firstname} ${lastname}</p>
        <p><strong>Age:</strong> ${age || 'N/A'}</p>
        <p><strong>Phone:</strong> ${contactNumber || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions)
      .then(() => console.log('📧 Owner email sent!'))
      .catch(err => console.error('❌ Owner email failed:', err.message));

    // 4. Respond to frontend
    return res.status(201).json({
      message: '✅ Contact saved. Email sent to owner.',
      contact,
    });

  } catch (err) {
    console.error('❌ Error in createContact:', err.message);
    return res.status(500).json({ error: "Failed to create contact." });
  }
};