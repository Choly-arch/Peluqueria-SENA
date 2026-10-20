const express = require('express');
const TRutas = require('../../controlador/admin/CrearTrabajadorControlador');
const router = express.Router();

router.post('/atrabajadores', TRutas.crearTrabajador);

module.exports = router; 