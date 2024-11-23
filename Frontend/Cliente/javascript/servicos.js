

document.addEventListener('DOMContentLoaded', () => {
  // Recupera o objeto 'cliente' do localStorage
  const cliente = JSON.parse(localStorage.getItem('cliente'));

  // Verifica se o cliente existe e tem o atributo 'nome'
  if (cliente && cliente.nome) {
    // Seleciona o elemento com ID 'navbarDropdown'
    const dropdown = document.querySelector('#navbarDropdown');

    // Atualiza o conteúdo do dropdown com o nome do cliente
    dropdown.innerHTML = `
      <img src="../arquivos/imagens/foto-usuario.jpg" alt="User" width="30" height="30" class="rounded-circle">
      ${cliente.nome}
    `;
  } else {
    console.error('Cliente não encontrado no localStorage ou atributo nome está ausente.');
  }
});
let services = []; 
let total = 0;

let categoriasCache = {}; // cache para armazenar as categorias no navegador local

async function generateHTML() {
  const container = document.getElementById("servicos-container");
  container.innerHTML = "<p>Carregando...</p>"; // exibe um estado de carregamento aguardando a requisição

  try {
    // requisição das categorias
    const categoriasResponse = await fetch("http://localhost:8080/salaosenac/categorias"); 
    if (!categoriasResponse.ok) {
      throw new Error("Erro ao carregar as categorias");
    }
    
    const categorias = await categoriasResponse.json();
    console.log("Categorias recebidas:", categorias)

    // guardando as categorias em um cache para facilitar a busca pelo nome
    categorias.forEach((categoria) => {
      categoriasCache[categoria.idCategoria] = categoria.nome; // transformando cada  categoria.idCategoria em chave e passando seu nome como valor
    });

    console.log(categoriasCache); //verificando se deu certo


    // requisição para os serviços
    const servicosResponse = await fetch("http://localhost:8080/salaosenac/servicos"); 
    if (!servicosResponse.ok) {
      throw new Error("Erro ao carregar os serviços");
    }

    const servicos = await servicosResponse.json();

    // agrupando os serviços por categoria
    const categoriasAgrupadas = servicos.reduce((acc, servico) => {
      const categoriaId = servico.categoriaId || "Categoria nao encontrada";
      if (!acc[categoriaId]) {
        acc[categoriaId] = [];
      }
      acc[categoriaId].push(servico);
      console.log(categoriaId)
      return acc;
    }, {});

    // limpando o container
    container.innerHTML = "";

    // renderizando as categorias e serviços
    Object.entries(categoriasAgrupadas).forEach(([categoriaId, servicos]) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("category");

      const button = document.createElement("button");
      button.classList.add("category-btn");
      button.setAttribute("onclick", `toggleDropdown('${categoriaId}')`);
      // usando o nome da categoria obtido do cache, se não encontrado, usa "Sem Categoria"
      const categoriaNome = categoriasCache[categoriaId] || "Sem Categoria";
      button.innerHTML = `${categoriaNome} <span class="arrow">▾</span>`;
      categoryDiv.appendChild(button);

      const contentDiv = document.createElement("div");
      contentDiv.id = categoriaId;
      contentDiv.classList.add("category-content");
      contentDiv.style.display = "none";

      const ul = document.createElement("ul");
      ul.classList.add("subcategory");

      servicos.forEach((servico) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";

        li.innerHTML = `
          <span style="flex: 1; text-align: left;">${servico.nome}</span>
          <span style="flex: 1; text-align: center;">R$ ${parseFloat(servico.valor)
            .toFixed(2)
            .replace(".", ",")}</span>
          <span style="flex: 1; text-align: right;">
            <button class="remove-button" onclick="removeService(${servico.valor}, '${servico.nome}')">-</button>
            <button class="add-button" onclick="addService(${servico.valor}, '${servico.nome}')">+</button>
          </span>
        `;
        ul.appendChild(li);
      });

      contentDiv.appendChild(ul);
      categoryDiv.appendChild(contentDiv);
      container.appendChild(categoryDiv);
    });
  } catch (error) {
    console.error("Erro ao carregar os serviços:", error);
    container.innerHTML = "<p>Erro ao carregar os serviços.</p>";
  }
}

function addService(preco, nome) {
  if( services.length < 11){
    total += preco;
    services.push({ nome: nome, preco: preco });
    updateUI();
  } else if( services.length >= 11){
    alert("Não é possivel adicionar mais servicos") // pode mudar a forma de mostrar o limitador de serviço
  }
  
}

function removeService(preco, nome) {
  if(!services.length){
    
    } else{
      total -= preco;
      const index = services.findIndex(
        (service) => service.nome === nome && service.preco === preco
      );
      if (index > -1) {
        services.splice(index, 1);
      }
      updateUI();
  }
}

function updateUI() {
  document.getElementById("total-value").innerText = total
    .toFixed(2)
    .replace(".", ",");
  const servicesList = document.getElementById("services-list");
  servicesList.innerHTML = "";
  services.forEach((service) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${service.nome} - R$ ${service.preco
      .toFixed(2)
      .replace(".", ",")}`;
    servicesList.appendChild(listItem);
  });
}

function toggleDropdown(category) {
  const content = document.getElementById(category);
  content.style.display = content.style.display === "block" ? "none" : "block";
}

function cancelarAgendamento() {
  total = 0;
  services.length = 0;
  updateUI();
}

document.addEventListener("DOMContentLoaded", generateHTML);



