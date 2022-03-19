var params = new URLSearchParams(window.location.search);

// params
var nombre = params.get('nombre');
var sala = params.get('sala');

// References to jQuery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');


// Funciones para renderizar users
function renderizarUsuarios( personas ) {
    console.log( personas );

    var html = '';

    // Name to sala
    html += ' <li>';
    html +=     '<a href="javascript:void(0)" class="active"> Chat de <span> '+ params.get('sala') +' </span></a>';
    html += '</li>';

    // Users
    for (var i = 0; i < personas.length; i++) {
        // Valition phote 

        if (personas[i].nombre === 'rose' ) {
            html += '<li>'
            html +=     '<a  data-id="'+ personas[i].id +'" href="javascript:void(0)"><img src="assets/images/users/5.jpg" alt="user-img" class="img-circle"> <span>'+ personas[i].nombre +'<small class="text-success">online</small></span></a>'
            html += '</li>';
            
        }

        if(personas[i].nombre === 'Andres'){
                
                html += '<li>'
                html +=     '<a  data-id="'+ personas[i].id +'" href="javascript:void(0)"><img src="assets/images/users/6.jpg" alt="user-img" class="img-circle"> <span>'+ personas[i].nombre +'<small class="text-success">online</small></span></a>'
                html += '</li>';
        }
        

        if (personas[i].nombre === 'julia' || personas[i].nombre === 'carmen' || personas[i].nombre === 'andri'  ) {
            html += '<li>'
            html +=     '<a  data-id="'+ personas[i].id +'" href="javascript:void(0)"><img src="assets/images/users/4.jpg" alt="user-img" class="img-circle"> <span>'+ personas[i].nombre +'<small class="text-success">online</small></span></a>'
            html += '</li>';
            
        }
        
        if( personas[i].nombre !== 'rose' && personas[i].nombre !== 'Andres' && personas[i].nombre !== 'julia' && personas[i].nombre !== 'carmen' && personas[i].nombre !== 'andri'  ){

            html += '<li>'
            html +=     '<a  data-id="'+ personas[i].id +'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+ personas[i].nombre +'<small class="text-success">online</small></span></a>'
            html += '</li>';
        }
        
    }

    // return to html
    divUsuarios.html( html );

}

// render message
function renderizarMensajes(mensaje, yo) {

    var html = '';
    var fecha = new Date();
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';

        if(mensaje.nombre === 'rose'){
            html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';     
        }
        if(mensaje.nombre === 'Andres'){
            html += '    <div class="chat-img"><img src="assets/images/users/6.jpg" alt="user" /></div>';     
        }
        if(mensaje.nombre === 'carmen'){
            html += '    <div class="chat-img"><img src="assets/images/users/4.jpg" alt="user" /></div>';     
        }
        if(mensaje.nombre === 'julia'){
            html += '    <div class="chat-img"><img src="assets/images/users/4.jpg" alt="user" /></div>';     
        }
        if(mensaje.nombre === 'andri'){
            html += '    <div class="chat-img"><img src="assets/images/users/4.jpg" alt="user" /></div>';     
        }


        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {

        html += '<li class="animated fadeIn">';

        // if (mensaje.nombre !== 'Administrador') {
        //     html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        // }
        if(mensaje.nombre === 'rose'){
            html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';     
        }
        if(mensaje.nombre === 'Andres'){
            html += '    <div class="chat-img"><img src="assets/images/users/6.jpg" alt="user" /></div>';     
        }
        if(mensaje.nombre === 'carmen'){
            html += '    <div class="chat-img"><img src="assets/images/users/4.jpg" alt="user" /></div>';     
        }
        if(mensaje.nombre === 'julia'){
            html += '    <div class="chat-img"><img src="assets/images/users/4.jpg" alt="user" /></div>';     
        }
        if(mensaje.nombre === 'andri'){
            html += '    <div class="chat-img"><img src="assets/images/users/4.jpg" alt="user" /></div>';     
        }

        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    }

    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}



// Listeners obtener id with click
divUsuarios.on( 'click', 'a', function () {
    
    var id = $(this).data('id');
    if( id ){
        console.log(id);
    }
}); 

// Listener to message
formEnviar.on( 'submit', function (e) {

    e.preventDefault();
    // validar msm vacio
    if( txtMensaje.val().trim().length === 0 ){
        return;
    }

    // Enviar información
    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        txtMensaje.val('').focus();
        // Recibe to message
        renderizarMensajes( mensaje, true );
        scrollBottom();

    });



});