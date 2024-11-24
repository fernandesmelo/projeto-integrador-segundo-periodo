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

  // Recupera os dados de serviços e total do localStorage
  const savedData = JSON.parse(localStorage.getItem('selectedServices'));
  if (savedData) {
    services = savedData.services || [];
    total = savedData.total || 0;
    updateUI(); // Atualiza a interface com os dados recuperados
  }

  // Gera o HTML dos serviços
  generateHTML();
});

let services = [];
let total = 0;

let categoriasCache = {}; // Cache para armazenar as categorias no navegador local

const servicesKey = 'selectedServices'; // Chave para armazenar os serviços no localStorage
const totalKey = 'totalValue'; // Chave para armazenar o valor total no localStorage

async function generateHTML() {
  const container = document.getElementById("servicos-container");
  container.innerHTML = "<p>Carregando...</p>"; // Exibe um estado de carregamento aguardando a requisição

  try {
    // Requisição das categorias
    const categoriasResponse = await fetch("http://localhost:8080/salaosenac/categorias"); 
    if (!categoriasResponse.ok) {
      throw new Error("Erro ao carregar as categorias");
    }

    const categorias = await categoriasResponse.json();
    console.log("Categorias recebidas:", categorias);

    // Guardando as categorias em um cache para facilitar a busca pelo nome
    categorias.forEach((categoria) => {
      categoriasCache[categoria.idCategoria] = categoria.nome; // Transformando cada categoria.idCategoria em chave e passando seu nome como valor
    });

    console.log(categoriasCache); // Verificando se deu certo

    // Requisição para os serviços
    const servicosResponse = await fetch("http://localhost:8080/salaosenac/servicos"); 
    if (!servicosResponse.ok) {
      throw new Error("Erro ao carregar os serviços");
    }

    const servicos = await servicosResponse.json();

    // Agrupando os serviços por categoria
    const categoriasAgrupadas = servicos.reduce((acc, servico) => {
      const categoriaId = servico.categoriaId || "Categoria nao encontrada";
      if (!acc[categoriaId]) {
        acc[categoriaId] = [];
      }
      acc[categoriaId].push(servico);
      console.log(categoriaId);
      return acc;
    }, {});

    // Limpando o container
    container.innerHTML = "";

    // Renderizando as categorias e serviços
    Object.entries(categoriasAgrupadas).forEach(([categoriaId, servicos]) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("category");

      const button = document.createElement("button");
      button.classList.add("category-btn");
      button.setAttribute("onclick", `toggleDropdown('${categoriaId}')`);
      // Usando o nome da categoria obtido do cache, se não encontrado, usa "Sem Categoria"
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
            <button class="remove-button" onclick="removeService(${servico.valor}, '${servico.nome}', '${servico.idServico}')">-</button>
            <button class="add-button" onclick="addService(${servico.valor}, '${servico.nome}', '${servico.idServico}')">+</button>
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

function addService(preco, nome, idServico) {
  if (services.length < 11) {
    total += preco;
    services.push({ nome: nome, preco: preco, idServico: idServico });
    updateUI();
    saveToLocalStorage(); // Salva no localStorage após adicionar
  } else if (services.length >= 11) {
    alert("Não é possível adicionar mais serviços");
  }
}

function removeService(preco, nome, idServico) {
  if (services.length > 0) {
    total -= preco;
    const index = services.findIndex(
      (service) => service.nome === nome && service.preco === preco && service.idServico === idServico
    );
    if (index > -1) {
      services.splice(index, 1);
    }
    updateUI();
    saveToLocalStorage(); // Salvar no localStorage
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

function saveToLocalStorage() {
  // Salvar serviços no localStorage
  localStorage.setItem(servicesKey, JSON.stringify(services));
  // Salvar total no localStorage
  localStorage.setItem(totalKey, total.toFixed(2));
}

function toggleDropdown(category) {
  const content = document.getElementById(category);
  content.style.display = content.style.display === "block" ? "none" : "block";
}

function cancelarAgendamento() {
  total = 0;
  services.length = 0;
  updateUI();
  localStorage.removeItem('selectedServices'); // Limpa os dados no localStorage
}

document.addEventListener("DOMContentLoaded", generateHTML);
