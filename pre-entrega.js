//* Segunda Pre-Entrega vamos a mejorar nuestro simulador de credito
//* para ver la funcionalidad del simulador
//* debe primero abrir console


class simuladorPrestamo { //*Crear objetos

    constructor() {
        this.Usuarios = []; //?Para guardar los arrays
        this.opcionesMenu(); //?Cree un menu de opciones par el usuario

    }

    //!Use metodos para sustituir las funciones anteriores

    crearUsuario() {
        const usuario = {
            nombre: prompt("Ingrese Su Nombre:"),
            montoDePrestamo: this.obtenerMontoDePrestamo(),
            tasaDeInteres: 0,
            cantidadDeCuota: this.obtenerCantidadCuotas(),
            cuotaMensual: 0,
        };

        usuario.tasaDeInteres = this.calcularTasaDeInteres(usuario.montoDePrestamo);
        
        usuario.cuotaMensual = this.calcularCuotaMensual(usuario.montoDePrestamo, usuario.tasaDeInteres, usuario.cantidadDeCuota );

        this.Usuarios.push(usuario);

        this.mostrarRespuesta(usuario);

    }

    obtenerMontoDePrestamo() {
        let monto;
        
        do {

            monto = parseInt(prompt("Ingrese El Monto Del Prestamo:"))

            const tasa = this.calcularTasaDeInteres(monto);

            if (tasa === null) {

                alert("Por Favor Ingresar Un Monto Valido");

            }

        }while (monto === null);
        
        return monto;
        
    }

    calcularTasaDeInteres(monto) {
        if(monto >= 500000 && monto <= 1000000) {
            return 0.045;
        }
        else if (monto > 1000000 && monto < 4000000) {
            return 0.05;
        }
        else if (monto >= 4000000){
            return 0.055;
        }
        else {
            alert("Monto Ingresado No Es Valido");
            return null;
        }
    }

    obtenerCantidadCuotas() {
        
        let cantidad;
        
        do {

            cantidad = parseInt(prompt("Cantidad De Años Que Desea Pagar El Prestamo:"));
        } 
        
        while (isNaN(cantidad));
        
        return cantidad;

    }

    calcularCuotaMensual(monto, tasa, plazo) {

        const tasaMensual = tasa / 12;

        const plazoMeses = plazo * 12;

        return (monto * tasaMensual) / (1 - (1 + tasaMensual) ** -plazoMeses);

    }

    mostrarRespuesta(usuario) {

        const respuesta = `Sr o Sra ${usuario.nombre}, 
                            Su préstamo de ${usuario.montoDePrestamo} está Aprobado, 
                            la tasa de interés será de ${usuario.tasaDeInteres} anual,
                            Durante ${usuario.cantidadDeCuota} años,
                            Su cuota será ${usuario.cuotaMensual} mensual.`;

        console.log(respuesta);

    }

    mostrarUsuarios() {

        console.log("Lista De Usuarios:");

        const UsuariosArray = this.Usuarios.map(usuario => ({
            Nombre: usuario.nombre,
            Monto: usuario.montoDePrestamo,
            Cuotas: usuario.cantidadDeCuota,
            TasaDeInteres: usuario.tasaDeInteres,
        }));
    
        UsuariosArray.forEach(user => {

            console.log(UsuariosArray);

        });
    
    }

    eliminarUsuario(nombreUsuario) {

        const indiceUsuario = this.Usuarios.findIndex(usuario => usuario.nombre.toLowerCase() === nombreUsuario.toLowerCase());
        
        if (indiceUsuario !== -1) {

            this.Usuarios.splice(indiceUsuario, 1);

            console.log("Usuario Eliminado Correctamente");

        } else {

            console.log("Usuario No Existe");

        }

    }

    opcionesMenu() {

        let opcion;

        do {
            opcion = parseInt(prompt(`Menu:
            1. Agregar Usuario
            2. Mostrar Lista De Usuarios
            3. Eliminar Usuario
            4. Modificar Valor Del Prestamo
            5. Modificar Cantidad de Cuotas
            6. Buscar Cliente Por Nombre
            7. Salir`));

            switch (opcion) {
                case 1:
                    this.crearUsuario();
                    break;
                case 2:
                    this.mostrarUsuarios();
                    break;
                case 3:
                    const nombreUsuario = prompt("Ingrese el nombre del cliente a eliminar:");
                    this.eliminarUsuario(nombreUsuario);
                    break;
                case 4:
                    const nuevoMonto = parseInt(prompt("Ingrese el nuevo monto del préstamo:"));
                    this.modificarValorPrestamo(nuevoMonto);
                    break;
                case 5:
                    const nuevaCuota = parseInt(prompt("Ingrese la nueva cantidad de cuotas:"));
                    this.modificarCantidadCuotas(nuevaCuota);
                    break;
                case 6:
                    const nombreABuscar = prompt("Ingrese el nombre del cliente a buscar:");
                    this.buscarUsuario(nombreABuscar);
                    break;
                case 7:
                    console.log("¡Hasta luego!");
                    break;
                default:
                    alert("Opción no válida. Intente de nuevo.");
                    break;
            }
        } while (opcion !== 7);
    }


    buscarUsuario(nombreUsuario) {

        const usuarioEncontrado = this.Usuarios.find(usuario => usuario.nombre.toLowerCase() === nombreUsuario.toLowerCase());
        
        if (usuarioEncontrado) {
            
            console.log("Usuario Encontrado:");
            
            this.mostrarRespuesta(usuarioEncontrado);

        } else {
            
            console.log("Usuario No Encontrado");
        
        }

    }

    modificarValorPrestamo(nuevoMonto) {

        const nombreUsuario = prompt("Ingrese El Cliente A Modificar:");

        const usuarioAModificar = this.Usuarios.find(usuario => usuario.nombre.toLowerCase() === nombreUsuario.toLowerCase());
    
        if (usuarioAModificar) {

            usuarioAModificar.montoDePrestamo = nuevoMonto;

            usuarioAModificar.tasaDeInteres = this.calcularTasaDeInteres(nuevoMonto);

            usuarioAModificar.cuotaMensual = this.calcularCuotaMensual(nuevoMonto, usuarioAModificar.tasaDeInteres, usuarioAModificar.cantidaDeCouta);

            console.log(`El Prestamo De: ${usuarioAModificar.nombre} Se A Modificado A ${nuevoMonto}.`);
        } else {
            alert("Cliente No Existe");
        }
    }

    modificarCantidadCuotas(nuevaCuota) {

        const nombreUsuario = prompt("ingrese El Cliente Que Desea Modificar Cuotas:");

        const usuarioAModificar = this.Usuarios.find(usuario => usuario.nombre.toLowerCase() === nombreUsuario.toLowerCase());
    
        if (usuarioAModificar) {

            usuarioAModificar.cantidaDeCouta = nuevaCuota;

            usuarioAModificar.cuotaMensual = this.calcularCuotaMensual(usuarioAModificar.montoDePrestamo, usuarioAModificar.tasaDeInteres, nuevaCuota);

            console.log(`Las Cuotas Del Cliente ${usuarioAModificar.nombre} Se han Modificado ${nuevaCuota} Años.`);

        } else {
            alert("Cliente no Existe");
        }
    }

}

const simulador = new simuladorPrestamo();