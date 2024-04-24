const clientes = []; // array vazio para armazenar os clientes;

function adicionar() {
  // função para adicionar um cliente ao array;
  let cliente = {}; // objeto vazio para armazenar os dados do cliente;
  let nome = document.getElementById("nome");
  let sobrenome = document.getElementById("sobrenome");
  let idade = document.getElementById("idade");
  cliente.nome = nome.value;
  cliente.sobrenome = sobrenome.value;
  cliente.idade = idade.value;
  console.log(cliente);
  clientes.push(cliente);
  console.log(clientes);
  listar();
  

}

function listar() {
  // função para listar os clientes cadastrados;

  let text = "<ul>";
  for (let i = 0; i < clientes.length; i++) {
    text += "<li>" + clientes[i].nome +" "+ clientes[i].sobrenome + "</li>";
  }

  text += "</ul>";

  document.getElementById("listaP").innerHTML = text;
}

function filtrar() {
    // função para filtrar os clientes por idade;
  let idadeFiltro = document.getElementById("idadeFiltro").value; // valor do input de filtro;
  let text = "<ul>";
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].idade == idadeFiltro) {
      text += "<li>" + clientes[i].nome +" "+ clientes[i].sobrenome +"</li>"; // adiciona o nome do cliente ao texto; cocatenar (+ " ")
    }
    
  }

  text += "</ul>";

  document.getElementById("listaP").innerHTML = text;
}

function apelido() {
  // função para adicionar um apelido ao cliente;
  let apelido = document.getElementById("apelidoClientes").value; // valor do input de apelido;
  let text = "<ul>";
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].sobrenome == apelido){ // adiciona o apelido ao cliente;
        text += "<li>" + clientes[i].nome +" "+ clientes[i].sobrenome + "</li>"; // adiciona o nome do cliente ao texto;
        }
    }

    text += "</ul>";

  document.getElementById("listaP").innerHTML = text;
}
