const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(require('./routes/index'));
// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use(express.static(path.join(__dirname)));

// Body Parser Middleware

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send-email', (req, res) => {
  const output = `
    <p>Ha recibido una nueva solicitud de contacto desde La Pagina WEB</p>
    <h3>Datos del Cliente:</h3>
    <ul>  
      <li>Nombre: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Telefono: ${req.body.phone}</li>
    </ul>
    <h3>Mensaje</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'miencargopty.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'miencargopty@gmail.com', // generated ethereal user
        pass: '21012019'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Contactenos" <miencargopty.com>', // sender address
      to: 'info@miencargopty.com', // list of receivers
      subject: 'SOLICITUD DE CONTACTO', // Subject line
      text: 'Un potencial cliente quiere contactarte.', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  });

app.listen(3000, () => console.log('Server started...'));