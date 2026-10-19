const modelo = require('../../modelo/admin/CrearClienteModelo');

class CrearClienteControlador {

     static async crearCliente(req, res) {
        const { t1: tipoD, t2: numeroD, t3: nom, t4: dir, t5: tel, t6: correo, t7: contras } = req.body;
        // ------------👁️‍🗨️ validaciones👁️‍🗨️----------------
        // Validar campos vacíos❓❓❓❓❓----------------
        const errorCampos = CrearClienteControlador.verCampos(tipoD, numeroD, nom, dir, tel, correo, contras);
        if (errorCampos) {
            return res.status(400).json({ error: errorCampos });
        }
        // Validar tipo de documento❓❓❓❓❓❓-------------------
        const erortipoD = CrearClienteControlador.vertipoD(tipoD);
        if (erortipoD) {
            return res.status(400).json({ error: erortipoD });
        }

        // Validar número de documento❓❓❓❓❓❓----------------
        const errorIde = CrearClienteControlador.verIde(numeroD);
        if (errorIde) {
            return res.status(400).json({ error: errorIde });
        }

        // Validar nombres completos ❓❓❓❓❓❓❓------------
        const errornom = CrearClienteControlador.vernom(nom);
        if (errornom) {
            return res.status(400).json({ error: errornom });
        }

        // Validar dirección ❓❓❓❓❓❓❓------------
        const errordir = CrearClienteControlador.verdir(dir);
        if (errordir) {
            return res.status(400).json({ error: errordir });
        }

        // Validar teléfono❓❓❓❓❓❓❓-----------------------
        const errortel = CrearClienteControlador.verTel(tel);
        if (errortel) {
            return res.status(400).json({ error: errortel });
        }
        // Validar correo❓❓❓❓❓❓❓--------------------------
        const errorem = CrearClienteControlador.vercorreo(correo);
        if (errorem) {
            return res.status(400).json({ error: errorem });
        }
        // Validar contraseña❓❓❓❓❓❓-----------------------
        const errorkey = CrearClienteControlador.verkey(contras);
        if (errorkey) {
            return res.status(400).json({ error: errorkey });
        }
        
        try {
            const result = await modelo.crearClientes(tipoD, numeroD, nom, dir, tel, correo, contras);
            res.status(201).json({ mensaje: 'Cliente creado con exito', id: result.insertId });
        } catch (err) {
            if (err.message.includes("Duplicate entry")) {
                return res.status(409).json({ error: 'Ya existe un usuario con estos datos.',
                    sugerencia: 'intenta recuperar la cuenta o inicia sesión.' });
              } else {
                return res.status(500).json({ error: 'Error inesperado: ' + err.message });
              }
        }
        // ------------👁️‍🗨️ fin validaciones👁️‍🗨️------------
        
    }//cerrar crearcliente-------------------------------

    //👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊
    //-------------------validaciones----------------------------
    //👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊

    static verCampos(tipoD, numeroD, nom, dir, tel, correo, contras) {
        if (!tipoD || !numeroD || !nom || !dir || !tel || !correo || !contras) {
            return 'Todos los campos son obligatorios.';
        }
        return null; // no encontro campos vacios
    }//cerrar verCampos

    //validar tipo documento
    static vertipoD(tipoD) {
        const tip = /^[A-Z\s]{2,3}$/;
        if (!tip.test(tipoD)) {
            return 'tipo de documentos invalidos minimo 2 caracteres o maximo 3 CC, TI, CE';
        } else {
            return null;
        }
    }

    //validar numero de documento
    static verIde(numeroD) {
        if (!/^\d{8,10}$/.test(numeroD)) {
            return 'La identificación debe tener entre 8 y 10 dígitos numéricos.';
        } else {
            return null; // Todo bien
        }
    } 

    //verificar nombres completos
    static vernom(nom) {
        const name = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
        if (!name.test(nom)) {
            return 'Nombres y apellidos invalidos minimo 3 caracteres o maximo 100 solo letras minuscula o ]Mayuscula';
        } else {
            return null;
        }
    }

    // verificar direccion
    static verdir(direccion) {
        const dirRegex = /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s#.,-]{5,200}$/;
        if (!dirRegex.test(direccion)) {
            return 'Dirección inválida. Debe tener entre 5 y 200 caracteres y puede incluir letras, números, espacios y los símbolos #, ., , y -.';
        } else {
            return null; // Todo bien
      }
}
    // valider
    //verificar telefono
    static verTel(tel) {
        if (!/^\d{10}$/.test(tel)) {
            return 'El teléfono debe tener exactamente 10 dígitos numéricos.';
        } else {
            return null; // todo bien
        }
    }
    //validar correo
    static vercorreo(correo) {
        const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!er.test(correo) || correo.length > 250) {
            return 'Correo inválido. Ejemplo válido: ejemplo@email.com';
        } else {
            return null;
        }
    }//cerrar vercorreo

    //verificar contraseña
    static verkey(contras) {
        const key = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!key.test(contras)) {
            return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial.';
        } else {
            return null;
        }
    }
    //👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊👊
}//cerrar clase controlador

module.exports = CrearClienteControlador;

