const Conexion = require('../bd/Conexion');
const dbService = new Conexion();
const bcrypt = require('bcrypt');

class loginAdminModelo {
  // Buscar usuario por correo
  static async buscarCorreo(correo) {
    const query = 'SELECT * FROM trabajadores WHERE correo = ?';
    try {
      const result = await dbService.query(query, [correo]);
      return result.length ? result[0] : null;
    } catch (err) {
      throw new Error(`Error al buscar el usuario : ${err.message}`);
    }
  }

  // Validar correo y contraseña
  static async validarCredenciales(correo, contras) {
    if (!correo || !contras) {
      throw new Error('Correo y contraseña son obligatorios');
    }

    try {
      const usuario = await this.buscarCorreo(correo); // Se busca el correo
      if (!usuario) {
        return null; // Usuario no encontrado
      }

      // Comparar la contraseña encriptada
      // console.log('¿Llegó la contraseña?', typeof contras === 'string');
      // console.log('¿Se encontró el hash?', typeof usuario.contrasena === 'string');

      const match = await bcrypt.compare(contras, usuario.contraseña); // Cambiado a "contrasena"
      if (!match) {
        return null; // Contraseña incorrecta
      }

      return usuario; // Credenciales correctas
    } catch (err) {
      throw new Error(`Error al validar credenciales: ${err.message}`);
    }
  }
}

module.exports = loginAdminModelo;