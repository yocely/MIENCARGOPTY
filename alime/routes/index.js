const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// CORREO DE REGISTRO CLIENTE
router.post('/sent-email', async (req, res) => {
    const { id, nombre, apellido, cedula, fecha_de_nacimiento, email, celular, direccion, pais } = req.body;
    contentHTML = `
    <p>Te Saluda tu amigo MI ENCARGO PTY, en este correo te dictamos tu casillero asignado el cual es:</h3>
    <ul>  
      <h2>Nombre: ${nombre} ${apellido} / MIENCARGO</h2>
      <h2>Direccion: 1345 NW 98TH CT, ST2 Miami, Florida </h2>
      <h2>Codigo Postal: 33172-2779 </h2>
      <h2>Teléfono: 786 360-2816</h2>
    </ul>

    <p>Por favor copia y pega estos datos en tu pagina de compra y disfruta de tu casillero desde YA!!</p>
    <p>Recuerda siempre enviarnos el numero de tracking o rastreo de tus paquetes para una mayor atencion.</p>
    <p>Cualquiera duda o consuta puedes contactarnos al Whatsapp: +507 6289-7140 o al correo: info@miencargopty.com</p>
    <br>
    <p>MI ENCARGO PTY no asume responsabilidad por ningún paquete o artículo transportado o entregado a nosotros por USPS, dado que no hay constancia de estatus en el tiempo real de las entregas, ni prueba de firma por parte de dicha compañía por ende no aceptamos ningún tipo de reclamos ni cargo de responsabilidad y queda a criterio del cliente si usa ese servicio en los estados unidos.</p>
   <br>
    <h3>Los datos ingresados fueron:</h3>
    <p>Esta informacion que mostramos abajo es para que te pongas en contacto con nosotros si has ingresado algun campo mal</p>
  <ul>  
    <li>Nombre: ${nombre}</li> <br>
    <li>Apellido: ${apellido}</li> <br>
    <li>Cedula: ${cedula}</li> <br>
    <li>Fecha de Nacimiento: ${fecha_de_nacimiento}</li> <br>
    <li>Email: ${email}</li> <br>
    <li>Telefono: ${celular}</li> <br>
    <li>Direccion: ${direccion}</li> <br>
    <li>Pais: ${pais}</li> <br>
  </ul> 
    `;
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
        cc: 'info@miencargopty.com',
        subject: 'CASILLERO MI ENCARGO PTY', // Subject line
        html: contentHTML
    })
    //req.flash('success', 'Usuario Registrado satisfactoriamente, Por favor revisa tu correo eletrónico.');
    res.redirect('/mens.html');
});
module.exports = router;
 //BASE DE DATOS
const pool = require('../databse');
router.get('/', (req, res) => {
    res.render('index.html');
});
router.get('/registro.html', (req, res) => {
    res.render('registro.html');
});
router.get('/tarifas.html', (req, res) => {
    res.render('tarifas.html');
});
router.get('/casillero.html', (req, res) => {
    res.render('casillero.html');
});
router.get('/rastreo.html', (req, res) => {
    res.render('rastreo.html');
});
router.get('/calculadora.html', (req, res) => {
    res.render('calculadora.html');
});
router.get('/pagos.html', (req, res) => {
    res.render('pagos.html');
});
router.get('/terminos.html', (req, res) => {
    res.render('terminos.html');
});
router.get('/nosotros.html', (req, res) => {
    res.render('nosotros.html');
});
router.get('/contactos.html', (req, res) => {
    res.render('contactos.html');
});
router.post('/registro.html', async (req, res) => {
        const { id, nombre, apellido, cedula, fecha_de_nacimiento, email, celular, direccion, pais } = req.body;
        const newLink = {
            id,
            nombre,
            apellido,
            cedula,
            fecha_de_nacimiento,
            email,
            celular,
            direccion,
            pais
        }
        await pool.query('INSERT INTO users set ?', [newLink]);
        console.log("'Registaro!!"); 
        res.redirect('/mens.html');
    });
router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM users');
    console.log(links);
    res.render('/list.html', { links });
});
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE ID = ?', [id]);
    //req.flash('success', 'Usuario Eliminado Removido satisfactoriamente');
    res.redirect('/index.html');
});
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    res.render('/edit.html', { link: links[0] });
});
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, cedula, fecha_de_nacimiento, email, celular, direccion, pais } = req.body;
    const newLink = {
        nombre,
        apellido,
        cedula,
        fecha_de_nacimiento,
        email,
        celular,
        direccion,
        pais
    }
    await pool.query('UPDATE users set ? WHERE id = ?', [newLink, id]);
    //req.flash('success', 'Usuario actualizado satisfactoriamente');
    res.redirect('/mens.html');
});
module.exports = router;