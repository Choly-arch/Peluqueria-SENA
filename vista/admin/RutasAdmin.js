const express = require('express');
const CRutas = require('../../controlador/admin/CrearClienteControlador');
const TRutas = require('../../controlador/admin/CrearTrabajadorControlador');
const router = express.Router();

router.post('/seguridad/crearcliente', CRutas.crearCliente);
router.post('/seguridad/creartrabajador', TRutas.crearTrabajador);

module.exports = router; 