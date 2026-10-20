const Conexion = require('../bd/Conexion');
const dbService = new Conexion();
const bcrypt = require('bcrypt');

class CrearTrabajadorModelo {

//  funcion para crear nuevos trabajadores por el admin
  static async crearTrabajadores(tipoD, numeroD, nom, dir, tel, correo, contras, rol) {
    const query = 'INSERT INTO trabajadores (tipoDeDocumento, numeroDocumento, nombres, dirección, telefono, correo, contraseña, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    try {
      // Generar el hash de la contraseña con bcrypt
      const salto = 10; // Nivel de seguridad de encriptación
      const contra = await bcrypt.hash(contras, salto);
      rol = 'Trabajador'; // Asignar el rol de trabajador de forma predeterminada 
      return await dbService.query(query, [tipoD, numeroD, nom, dir, tel, correo, contra, rol]);
    } catch (err) {
      throw new Error(`Error al crear su nueva cuenta trabajador: ${err.message}`);
    }
  }//cerrar crear trabajador
}

module.exports = CrearTrabajadorModelo;