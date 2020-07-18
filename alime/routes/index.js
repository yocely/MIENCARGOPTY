const { Router } = require('express');
const nodemailer = require('nodemailer');
const router = Router();

router.post('/send-email', async (req, res)=>{
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

 const transporter = nodemailer.createTransport({

    host: 'smtp.zoho.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'info@miencargopty.com', // generated ethereal user
        pass: 'Panama$2020'  // generated ethereal password
    },
    tls:{
        rejectUnauthorized: false
    }
     
  });

const info = await transporter.sendMail({

    from: '"Contactenos" <info@miencargopty.com>', // sender address
      to: 'info@miencargopty.com', // list of receivers
      subject: 'SOLICITUD DE CONTACTO', // Subject line
      html: contentHTML
     
  });

  console.log('Mensaje Enviado', info.messageId);

  console.log(contentHTML);
    res.redirect('/mensaje.html');
})

module.exports = router;