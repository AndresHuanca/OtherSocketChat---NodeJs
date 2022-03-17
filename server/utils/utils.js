// Estructure message 
const crearMensaje = ( name, message = '' ) => {

    return {
        name,
        message,
        date: new Date().getTime()
    };

};

module.exports = {
    crearMensaje
};