const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const app = express();
const { Router } = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const router = Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.set('alime', path.join(__dirname, 'alime'));
// middlewares
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/', require('./routes/index'));
app.use(require('./routes/index'));
app.get('/', (req, res) => {
  res.send('contact');
});
// enviar correo de Contactenos
app.post('/send-email', async (req, res)=>{
  const {name , email, phone, message}=req.body;  
  contentHTML =`
  <p>Ha recibido una nueva solicitud de contacto desde La Pagina WEB</p>
  <h3>Datos del Cliente:</h3>
  <ul>  
    <li>Nombre: ${name}</li>
    <li>Email: ${email}</li>
    <li>Telefono: ${phone}</li>
  </ul>
  <h3>Mensaje</h3>
  <p>${message}</p>
`;
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
     host: 'smtp.zoho.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'noreply@miencargopty.com', // generated ethereal user
      pass: 'zVp62wdH6!$GCyF'   // generated ethereal password
    },
    tls:{
        rejectUnauthorized: false
    }
       });
  const info = await transporter.sendMail({
     from: '"Contactenos" <noreply@miencargopty.com>', // sender address
      to: 'info@miencargopty.com', // list of receivers
      subject: 'SOLICITUD DE CONTACTO', // Subject line
      html: contentHTML
        });
  console.log('Mensaje Enviado', info.messageId);
    res.redirect('/mensaje.html');
  });
  // enviar correo de Contactenos
app.post('/rec-email', async (req, res)=>{
  const {name , email, phone, message}=req.body;  
  contentHTML =`
  <p>Ha recibido una nueva solicitud de Recuperar casillero desde la Página web.</p>
  <h3>Correo del Cliente:</h3>
  <ul>  
    <li>Email: ${email}</li>
`;
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
     host: 'smtp.zoho.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'noreply@miencargopty.com', // generated ethereal user
      pass: 'zVp62wdH6!$GCyF'   // generated ethereal password
    },
    tls:{
        rejectUnauthorized: false
    }
       });
  const info = await transporter.sendMail({
     from: '"RECUPERACION" <noreply@miencargopty.com>', // sender address
      to: 'info@miencargopty.com', // list of receivers
      subject: 'SOLICITUD DE RECUPERAR CASILLERO', // Subject line
      html: contentHTML
        });
  console.log('Mensaje Enviado', info.messageId);
    res.redirect('/not.html');
  });
app.listen(3000, () => console.log('Servidor iniciado...'));
module.exports = router;