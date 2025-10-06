const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Configure Nodemailer with your email credentials
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: '36mjipeameer@gmail.com',
    pass: 'Kcaco#100'
  }
});

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle form submissions
app.post('/forms/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create the email content
  const mailOptions = {
    from: email, // Sender's email from the form
    to: '36mjipeameer@gmail.com', // Your email address to receive the form details
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('An error occurred while sending the email.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Your message has been sent. Thank you!');
    }
  });
});

const port = process.env.PORT || 5501; // Use the port specified in the environment variable, or fallback to port 3001

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
