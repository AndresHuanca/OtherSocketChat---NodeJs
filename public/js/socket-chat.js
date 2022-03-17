var socket = io();

// get params name person
var params = new URLSearchParams( window.location.search);

// Validatión name person
if( !params.has('nombre') ||!params.has('sala') ) {
    // redir
    window.location = 'index.html';
    throw new Error( 'the name is sala necesary ');
}

// save user
var usuario = {
    nombre: params.get('nombre'), 
    sala: params.get('sala'),
};

// Sockets config

socket.on('connect', function() {
    console.log('Conectado al servidor');

    // emit and escucha callback
    socket.emit( 'entrarChat', usuario, function( resp) {
        console.log( resp );
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información si sale
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor salida:', mensaje);

});

// Escuchar información si ingresa 
socket.on('listaPersona', function(mensaje) {

    console.log('Servidor ingreso :', mensaje);

});

// Message private
socket.on('mensajePrivado', function(mensaje) {

    console.log('Message Private :', mensaje);

});

