$(document).ready(function () {
    function validarNombre() {
    var valor = document.getElementById('nombre').value.trim();
    var $entrada = $('#nombre');
    var $mensaje = $('#msg-nombre');
    var soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

    if (valor.length === 0) {
        mostrarError($entrada, $mensaje, 'El nombre es obligatorio.');
        return false;
    }
    if (valor.length < 3) {
        mostrarError($entrada, $mensaje, 'Mínimo 3 caracteres.');
        return false;
    }
    if (!soloLetras.test(valor)) {
        mostrarError($entrada, $mensaje, 'Solo se permiten letras');
        return false;
    }

    mostrarExito($entrada, $mensaje, 'Nombre válido.');
    return true;
}

    function validarDNI() {
        var valor = document.getElementById('dni').value.trim();
        var $entrada = $('#dni');
        var $mensaje = $('#msg-dni');

        if (valor.length === 0) {
            mostrarError($entrada, $mensaje, 'El DNI es obligatorio.');
            return false;
        }
        if (isNaN(valor) || valor === '') {
            mostrarError($entrada, $mensaje, 'El DNI debe cntener solo números.');
            return false;
        }
        if (valor.length !== 8) {
            mostrarError($entrada, $mensaje, 'El DNI debe tener exactamente 8 dígitos. Ingresaste ' + valor.length + '.');
            return false;
        }

        mostrarExito($entrada, $mensaje, 'DNI válido.');
        return true;
        }

    function validarFecha() {
        var valor = document.getElementById('fechaNacimiento').value;
        var $entrada = $('#fechaNacimiento');
        var $mensaje =$('#msg-fecha');

        if (!valor) {
        mostrarError($entrada, $mensaje, 'La fecha de nacimiento es obligatoria.');
        return false;
        }
        var fechaNacimiento = new Date(valor);
        var hoy = new Date();
        var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        var diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();

        if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
        }
        if (edad < 18) {
        mostrarError($entrada, $mensaje, 'Tenes ser mayor de 18 años.');
        return false;
        }
        mostrarExito($entrada, $mensaje, 'Fecha válida.');
        return true;
    }

    function mostrarError($entrada, $mensaje, texto) {
        $entrada.removeClass('con-exito').addClass('con-error');
        $mensaje.html(texto).removeClass('exito').addClass('error');
    }

    function mostrarExito($entrada, $mensaje, texto) {
        $entrada.removeClass('con-error').addClass('con-exito');
        $mensaje.html(texto).removeClass('error').addClass('exito');
    }

    function limpiarCampo($entrada, $mensaje) {
        $entrada.removeClass('con-error con-exito');
        $mensaje.html('').removeClass('error exito');
    }

    $('#btn-enviar').on('click', function () {
        var nombreValido = validarNombre();
        var dniValido = validarDNI();
        var fechaValida = validarFecha();
        var $mensajeGlobal = $('#msg-global');

        if (nombreValido && dniValido && fechaValida) {
        $mensajeGlobal
            .html('<strong>¡Formularioe nviado con éxito!</strong>')
            .removeClass('error')
            .addClass('exito')
            .show();
        $('#btn-enviar')
            .html('Enviado')
            .prop('disabled', true)
            .css('opacity', '0.75');

        } else {
        $mensajeGlobal
            .html('Revise los campos en rojo.')
            .removeClass('exito')
            .addClass('error')
            .show();
        }

        $('html, body').animate({
        scrollTop: $mensajeGlobal.offset().top - 120
        }, 400);
    });

    var listaPreguntas = [
        { numero: 1, etiqueta: 'Pregunta 1', texto: '¿Cuál es tu nacionalidad?'},
        { numero: 2, etiqueta: 'Pregunta 2', texto: '¿Cuál es tu nivel de conocimiento en programación? (Básico / Intermedio / Avanzado)' },
        { numero: 3, etiqueta: 'Pregunta 3', texto: '¿Por qué elegiste esta carrera?'}
    ];

    $('#btn-preguntas').on('click', function () {
        var listaRespuestas = [];
        listaPreguntas.forEach(function (pregunta) {
        var respuesta = prompt(pregunta.texto);

        if (respuesta === null) {
            listaRespuestas.push({ etiqueta: pregunta.etiqueta, valor: null });
        } else {
            listaRespuestas.push({ etiqueta: pregunta.etiqueta, valor: respuesta.trim() });
        }
        });
        mostrarRespuestasEnDOM(listaRespuestas);
    });

    function mostrarRespuestasEnDOM(listaRespuestas) {
        var $contenedor= $('#contenedor-respuestas');
        var $tarjetaRespuestas = $('#tarjeta-respuestas');
        $contenedor.empty();

        listaRespuestas.forEach(function (respuesta) {
        var $elemento = $('<div></div>').addClass('elemento-respuesta');
        var $etiqueta= $('<strong></strong>').text(respuesta.etiqueta);

        if (respuesta.valor === null || respuesta.valor === '') {
            $elemento.addClass('sin-respuesta');
            $etiqueta.text(respuesta.etiqueta + ' — Sin respuesta');
            $elemento
            .append($etiqueta)
            .append($('<span></span>').text('No respondió esta pregunta.'));
        } else {
            $elemento
            .append($etiqueta)
            .append($('<span></span>').text(respuesta.valor));
        }
        $contenedor.append($elemento);
        });
        $tarjetaRespuestas.fadeIn(400);
        $('html, body').animate({
        scrollTop: $tarjetaRespuestas.offset().top - 80
        }, 500);
    }

    $('#nombre, #dni, #fechaNacimiento').on('input change', function () {
        var $botonEnviar = $('#btn-enviar');
        if ($botonEnviar.prop('disabled')) {
        $botonEnviar
            .html('Enviar Formulario')
            .prop('disabled', false)
            .css('opacity', '1');
        $('#msg-global').hide().removeClass('exito error').html('');
        }
    });
});