const express = require('express');
const CRutas = require('../../controlador/admin/CrearClienteControlador');
const TRutas = require('../../controlador/admin/CrearTrabajadorControlador');
const ARutas = require('../../controlador/admin/CrearAdminControlador');
const LRutas = require('../../controlador/admin/LoginAdminControlador');

const router = express.Router();

router.post('/seguridad/crearcliente', CRutas.crearCliente); //RF01
router.post('/seguridad/creartrabajador', TRutas.crearTrabajador); //RF04
router.post('/seguridad/crearadministrador', ARutas.crearAdmin);

router.post('/Seguridad/loginadmin', LRutas.validarCredencial);

module.exports = router; 