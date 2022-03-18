const { io } = require('../server');

// Add modedl class
const { Usuarios } = require('../classes/usuarios');
// Import model message
const { crearMensaje } = require('../utils/utils');

//Using
const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on( 'entrarChat', ( data, callback ) => {
        // Validation 
        if( !data.nombre || !data.sala ) {
            return callback({
                error: true,
                message: 'The name/sala to necesary'
            });
        }

        // ingreso to sala
        client.join( data.sala );

        // client.id id unique the socket
        usuarios.agregarPersona( client.id, data.nombre, data.sala );

        // ingreso de new person to chat -comunica a todos los usuarios del chat(1)
        client.broadcast.to( data.sala ).emit( 'listaPersona', usuarios.getPersonasPorSala( data.sala ));
        // client.broadcast.emit( 'listaPersona', ({messageAdmin: 'Admin', message: ` ${ data.nombre } ingreso al chat` }) );
        // Envia msm cuando ingresa
        client.broadcast.to( data.sala ).emit( 'crearMensaje', crearMensaje( 'Admin', ` ${ data.nombre } Unió al chat`) );


        // return by callback
        callback(usuarios.getPersonasPorSala( data.sala ));

    });

    // Create message
    client.on( 'crearMensaje', ( data, callback ) => {

        let persona = usuarios.getPersona( client.id );
        let mensaje = crearMensaje( persona.nombre, data.mensaje );

        client.broadcast.to( persona.sala ).emit( 'crearMensaje', mensaje );

        callback( mensaje );
    });


    // Delete person disconnect
    client.on( 'disconnect', () => {
        let personaBorrada = usuarios.borrarPersona( client.id );

        client.broadcast.to( personaBorrada.sala ).emit( 'crearMensaje', crearMensaje( 'Admin', ` ${ personaBorrada.nombre } abandono el chat`) );
        
        // ingreso de new person to chat - getPersonas( muestra todos los usuarios)
        client.broadcast.to( personaBorrada.sala ).emit( 'listaPersona', usuarios.getPersonasPorSala( personaBorrada.sala ) );

    });

    // Message private
    client.on('mensajePrivado', ( data ) => {

        let persona = usuarios.getPersona( client.id );
        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        // Private
        client.broadcast.to(data.para).emit( 'mensajePrivado', mensaje );

    });


    
});
