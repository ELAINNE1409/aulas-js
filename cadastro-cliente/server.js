const express = require('express');
const mysql = require('mysql2/promise')
const app = express();

const PORT = process.env.PORT || 3000;

/*
Criar a conexao com a base de dados
*/
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'techgirls',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(express.json());

app.use(express.urlencoded({extended: true}));

/*
Cliente {nome, id, morada}
conta {id_cliente, id, saldo}
*/ 
let clientes = [];
let contas = [];

app.put('/cliente', async(req, res) => {
    try {
        const {id, nome, morada} = req.body;
        const connection = await pool.getConnection();
        const [result] = await connection.execute('UPDATE cliente SET nome = ?, morada = ? WHERE id = ?', [nome, morada, id]);
        connection.release();
        res.status(200).json({ message: 'Cliente atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.get('/clientes', async(req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.execute('SELECT * FROM cliente');
        connection.release();
        res.json(rows); // Retorna os resultados da consulta como JSON
    } catch (error) {
        console.error('Erro ao obter clientes:', error);
        res.status(500).json({ error: 'Erro interno do servidor' }); // Retorna um status 500 em caso de erro
    }
});

app.get('/contas_clientes', async(req, res) => {
    const {id_cliente} = req.body;
    const contasC = [];
    let nomeCliente = "";
    if(id_cliente){
        for(let i = 0; i < clientes.length; i++){
            if(clientes[i].id === id_cliente){
                nomeCliente = clientes[i].nome;
                for(let j = 0; j < contas.length; j++){
                    if(contas[j].id_cliente === id_cliente){
                        contasC.push(contas[j]);
                    }
                }
                break;
            }
        }
    }

    const clienteContas = {
        id_cliente: id_cliente,
        nome_cliente : nomeCliente,
        contasC
    }
    res.json(clienteContas)
});

app.post('/cliente', async(req, res) => {
    console.log(req.body);
    const {nome, morada} = req.body;
    try {
        if(nome !== null && morada !== null){
            const connection = await pool.getConnection();
            await connection.execute('INSERT INTO cliente (nome, morada) VALUES (?, ?)', [nome, morada]);
            connection.release();    
            res.json({sucess: true, message: 'cliente registado'});        
        }
    } catch (error) {
        console.error('Erro ao registar um cliente', error);
        res.status(500).json({sucess: false, message: 'Erro ao registar um cliente'});
    }
    
    
    
});

app.post('/conta', async(req, res) => {
    console.log(req.body);
    const {id_cliente, id, saldo} = req.body;
    let adicionado = false;

    if(id_cliente !== null && id !== null && saldo !== null){
        for(let i = 0; i < clientes.length; i++){
            if(clientes[i].id === id_cliente){
                const conta = {id : id, id_cliente : id_cliente, saldo : saldo};
                console.log(conta);
                contas.push(conta);
                adicionado = true;
                break;
            }
        }
    }
    if(adicionado){
        res.json({sucess: true, message: 'conta registada'});
    }else{
        res.json({sucess: false, message: 'Este cliente não existe.'});
    }
});

app.get('/contas', async(req, res) => {
    res.json(contas);
});

app.listen(PORT, () => {
    console.log(`A executar na porta http://localhost:${PORT}`)
});



