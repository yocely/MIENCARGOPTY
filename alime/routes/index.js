const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// CORREO DE REGISTRO CLIENTE
router.post('/sent-email', async (req, res) => {
    const { id, nombre, apellido, cedula, fecha_de_nacimiento, email, celular, direccion, pais } = req.body;
    contentHTML = `
    <p>Te Saluda tu amigo MI ENCARGO PTY, en este correo te dictamos tu casillero asignado el cual es:</h3>
    <ul>  
      <h3>Nombre: ${nombre} ${apellido} / MIENCARGO</h3>
      <h3>Direccion: 1345 NW 98TH CT, ST2 Miami, Florida </h3>
      <h3>Codigo Postal: 33172-2779 </h3>
      <h3>Teléfono: 786 360-2816</h3>
    </ul>
    <p>Por favor copia y pega estos datos en tu pagina de compra y disfruta de tu casillero desde YA!!</p>
    <p>Recuerda siempre enviarnos el numero de tracking o rastreo de tus paquetes para una mayor atencion.</p>
    <h4>Cualquiera duda o consuta puedes contactarnos al Whatsapp: +507 6289-7140 o al correo: info@miencargopty.com</h4>
    <p>MI ENCARGO PTY no asume responsabilidad por ningún paquete o artículo transportado o entregado a nosotros por USPS, dado que no hay constancia de estatus en el tiempo real de las entregas, ni prueba de firma por parte de dicha compañía por ende no aceptamos ningún tipo de reclamos ni cargo de responsabilidad y queda a criterio del cliente si usa ese servicio en los estados unidos.</p>
   <br>
    ` 
    contentHTML2 = `<ul>  
    <li>Nombre: ${nombre}</li> <br>
    <li>Apellido: ${apellido}</li> <br>
    <li>Cedula: ${cedula}</li> <br>
    <li>Fecha de Nacimiento: ${fecha_de_nacimiento}</li> <br>
    <li>Email: ${email}</li> <br>
    <li>Telefono: ${celular}</li> <br>
    <li>Direccion: ${direccion}</li> <br>
    <li>Pais: ${pais}</li> <br>
  </ul> `;
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'noreply@miencargopty.com', // generated ethereal user
            pass: 'zVp62wdH6!$GCyF'   // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const info = await transporter.sendMail({
       
        from: '"No Reply" <noreply@miencargopty.com>', // sender address
        to: email,// list of receivers
        subject: 'CASILLERO MI ENCARGO PTY', // Subject line
        html: contentHTML
    })

    const info2 = await transporter.sendMail({
       
        from: '"NUEVO CLINTE" <noreply@miencargopty.com>', // sender address
        to: 'info@miencargopty.com',// list of receivers
        subject:'NUEVO CLINTE REGISTRADO ', // Subject line
        html: contentHTML2
    })

    res.redirect('/mens.html');
});
module.exports = router;
 
