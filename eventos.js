const express = require('express');
const {Pool} = require('pg');
const { client_encoding } = require('pg/lib/defaults');
const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'Music',
    password:'1234',
    port:'5432',
    max: 20,
    min: 2,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,

});


async function ingresar(nombre, rut, curso, nivel){

    let count = comparar(rut)
    console.log(count)

    if(count == 0){
        pool.connect((error_conexion, client, release) => {
        const SQLQuery2 = {
            text: "INSERT INTO estudiante (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *;",
            values:[nombre, rut, curso, nivel]
        };
        client.query(
            SQLQuery2,
            (error_query, res) => {
                release();
                console.log("Nuevo alumno agregado \n ",res.rows); 
            })
        }
        )
    }else{
        console.log("El alumno ya existe \n "); 
    }
    pool.end();
};


async function comparar(rut){
    pool.connect((error_conexion, client, release) => {

        if (error_conexion) return console.error(error_conexion.code)
        const SQLQuery = {
            text: "SELECT * FROM estudiante WHERE rut = $1",
            values:[rut]
        };
        client.query(
            SQLQuery,
            (error_query, result) => {
                release();
                console.log(result.rowCount)
                return result.rowCount
            }, 
            pool.end();
        );
        pool.end();
    })
};


async function ingresar2(nombre, rut, curso, nivel){
    pool.connect((error_conexion, client, release) => {
        if (error_conexion) return console.error(error_conexion.code)
        const SQLQuery = {
            text: "INSERT INTO estudiante (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *;",
            values:[nombre, rut, curso, nivel]
        };
        client.query(
            SQLQuery,
            (error_query, result) => {
                release();
                console.log("Nuevo alumno agregado \n ",result.rows); 
            } 
        );
        pool.end();
    })
};


async function consultar () {
    pool.connect((error_conexion, client, release) => {
        const SQLQuery = {
            text: "SELECT * FROM estudiante",
        };
        client.query(
            SQLQuery,
            (error_query, result) => {
                release();
                console.log('Estudiantes ', result.rows);
            } 
        );
        pool.end();
    })
};

async function buscaRut(rut){
    pool.connect((error_conexion, client, release) => {
        const SQLQuery = {
            text: `SELECT * FROM estudiante WHERE rut = $1`,
            values: [rut]
        };
        client.query(
            SQLQuery,
            (error_query, result) => {
                release();
                console.log('Estudiante ', result.rows);
            } 
        );
        pool.end();
    })
};

async function edit(nombre, curso, nivel){
    pool.connect((error_conexion, client, release) => {
        const SQLQuery = {
            text: "UPDATE estudiante SET curso=$1, nivel=$2 WHERE nombre=$3 RETURNING *;",
            values:[curso, nivel, nombre]
        };
        client.query(
            SQLQuery,
            (error_query, result) => {
                release();
                console.log(`Alumno ${nombre} modificado con exito`); 
            } 
        );
        pool.end();
    })
};

async function eliminar(rut){
    pool.connect((error_conexion, client, release) => {
        const SQLQuery = {
            text: "DELETE FROM estudiante WHERE rut=$1 RETURNING *;",
            values:[rut]
        };
        client.query(
            SQLQuery,
            (error_query, result) => {
                release();
                console.log(`El alumno a sido eliminado`); 
            } 
        );
        pool.end();
    })
};

module.exports = {ingresar,consultar,buscaRut,edit,eliminar};