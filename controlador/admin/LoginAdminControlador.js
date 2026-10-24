// 1. este es rf-05 login admin funcion validarCredencial
const modelo = require('../../modelo/admin/LoginAdminModelo'); 

class LoginAdminControlador {
  // Validar correo y contraseña
  static async validarCredencial(req, res) {
    const { t6: correo, t7: contraseña } = req.body; // Renombramos t6 y t7 para mayor claridad

    if (!correo || !contraseña) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

    try {
      const user = await modelo.validarCredenciales(correo, contraseña);
      
      if (!user) {
        return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
      }

      res.json({ mensaje: 'Inicio de sesión exitoso', usuario: user });
    } catch (err) {
      res.status(500).json({ error: `Hubo un error al validar las credenciales: ${err.message}` });
    }
  }
}

module.exports = LoginAdminControlador;