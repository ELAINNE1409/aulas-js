const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({extended: true}));

/*
Cliente {nome, id, morada}
conta {id_cliente, id, saldo}
*/ 
let clientes = [];
let contas = [];


app.get('/clientes', async(req, res) => {
    res.json(clientes);
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
    const {nome, id, morada} = req.body;
    if(nome !== null && id !== null && morada !== null){
        const cliente = {id : id, nome : nome, morada : morada}
        console.log(cliente);
        clientes.push(cliente);
    }
    
    res.json({sucess: true, message: 'cliente registado'});
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



