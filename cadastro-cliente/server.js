const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({extended: true}));

let clients = [];

app.get('/cliente', async(req, res) => {
    console.log('entrou no cliente')
    res.json(clients);
});

app.post('/cliente', async(req, res) => {
    console.log(req.body);
    const {name} = req.body;
    console.log(name);
    clients.push(name);
    res.json({sucess: true, message: 'cliente registado'});
});

app.listen(PORT, () => {
    console.log(`A executar na porta http://localhost:${PORT}`)
});



