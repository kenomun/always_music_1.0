const express = require('express');
const {ingresar,consultar,buscaRut,edit,eliminar} = require('./eventos')
const argumentos = process.argv.slice(2);
const accion = argumentos[0]

const ejecuta=((accion)=>{

    const eventos = {
        ingresar:()=> ingresar(argumentos[1], argumentos[2], argumentos[3], argumentos[4]),
        buscar:()=> consultar(),
        'buscar-rut':()=> buscaRut(argumentos[1]),
        editar:()=> edit(argumentos[1],argumentos[2],argumentos[3]),
        eliminar:()=> eliminar(argumentos[1])
    }
    const ejecuta = eventos[accion] ? eventos[accion](): console.log('Agregar una accion o una accion valida')
    return ejecuta
});
ejecuta(accion)








