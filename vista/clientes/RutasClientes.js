const express = require('express');
const CRutas = require('../../../controlador/admin/CrearClienteControlador');
const router = express.Router();

router.post('/usuario/crear', CRutas.crearCliente); //RF02

module.exports = router; 