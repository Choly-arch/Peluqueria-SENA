const Conexion = require('../bd/Conexion');
const dbService = new Conexion();
const bcrypt = require('bcrypt');

class CrearAdminModelo {

  static async crearAdmin(tipoD, numeroD, nom, dir, tel, correo, contras, rol) {
    const query = 'INSERT INTO trabajadores (tipoDeDocumento, numeroDocumento, nombres, dirección, telefono, correo, contraseña, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    try {

      // Generar el hash de la contraseña con bcrypt
      const salto = 10; // Nivel de seguridad de encriptación
      const contra = await bcrypt.hash(contras, salto);

      rol = 'Admin'; // Asignar el rol de trabajador de forma predeterminada 

      return await dbService.query(query, [tipoD, numeroD, nom, dir, tel, correo, contra, rol]);
    } catch (err) {
      throw new Error(`Error al crear su nueva cuenta de administrador: ${err.message}`);
    }
  }//cerrar crear trabajador
}

module.exports = CrearAdminModelo;