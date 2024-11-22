let total = 0;
const services = [];
const servicos = [
  { categoria: "Cabeleireiro", nome: "Corte Feminino", preco: 65 },
  { categoria: "Cabeleireiro", nome: "Corte Masculino", preco: 45 },
  { categoria: "Cabeleireiro", nome: "Luzes", preco: 200 },
  { categoria: "Cabeleireiro", nome: "Escova", preco: 40 },
  { categoria: "Cabeleireiro", nome: "Barba / Design de Barba", preco: 40 },
  { categoria: "Manicure e Pedicure", nome: "Manicure", preco: 23 },
  { categoria: "Manicure e Pedicure", nome: "Esmaltação (Cortar + Lixar + Esmaltar)", preco: 13 },
  { categoria: "Manicure e Pedicure", nome: "Francesinha ou Inglesinha", preco: 5 },
  { categoria: "Manicure e Pedicure", nome: "Pedicure + Manicure", preco: 45 },
  { categoria: "Manicure e Pedicure", nome: "Pedicure", preco: 23 },
  { categoria: "Estética", nome: "Drenagem Linfática Corporal Manual (por área)", preco: 65 },
  { categoria: "Estética", nome: "Limpeza de Pele", preco: 85 },
  { categoria: "Estética", nome: "Reflexologia Podal", preco: 85 },
  { categoria: "Estética", nome: "Revitalização Facial", preco: 85 },
  { categoria: "Estética", nome: "Ventosaterapia (Sessão 40 minutos)", preco: 50 },
  { categoria: "Depilação com Cera", nome: "Depilação Feminina - 1/2 Pernas", preco: 30 },
  { categoria: "Depilação com Cera", nome: "Axilias", preco: 24 },
  { categoria: "Depilação com Cera", nome: "Virilha Simples (Contorno)", preco: 28 },
  { categoria: "Depilação com Cera", nome: "Pernas Completas", preco: 55 },
  { categoria: "Depilação com Cera", nome: "Coxas", preco: 40 },
];

function addService(preco, nome) {
  total += preco;
  services.push({ nome: nome, preco: preco });
  updateUI();
}

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
function removeService(preco, nome) {
  total -= preco;
  const index = services.findIndex(
    (service) => service.nome === nome && service.preco === preco
  );
  if (index > -1) {
    services.splice(index, 1);
  }
  updateUI();
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

function generateHTML() {
  const container = document.getElementById("servicos-container");
  const categorias = [...new Set(servicos.map((servico) => servico.categoria))];

  categorias.forEach((categoria) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");

    const button = document.createElement("button");
    button.classList.add("category-btn");
    button.setAttribute("onclick", `toggleDropdown('${categoria}')`);
    button.innerHTML = `${categoria} <span class="arrow">▾</span>`;
    categoryDiv.appendChild(button);

    const contentDiv = document.createElement("div");
    contentDiv.id = categoria;
    contentDiv.classList.add("category-content");
    contentDiv.style.display = "none";

    const ul = document.createElement("ul");
    ul.classList.add("subcategory");

    servicos
      .filter((servico) => servico.categoria === categoria)
      .forEach((servico) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";

        li.innerHTML = `
        <span style="flex: 1; text-align: left;">${servico.nome}</span>
        <span style="flex: 1; text-align: center;">R$ ${servico.preco
          .toFixed(2)
          .replace(".", ",")}</span>
        <span style="flex: 1; text-align: right;">
          <button class="remove-button" onclick="removeService(${
            servico.preco
          }, '${servico.nome}')">-</button>
          <button class="add-button" onclick="addService(${servico.preco}, '${
          servico.nome
        }')">+</button>
        </span>
      `;
        ul.appendChild(li);
      });

    contentDiv.appendChild(ul);
    categoryDiv.appendChild(contentDiv);
    container.appendChild(categoryDiv);
  });
}

function cancelarAgendamento() {
  total = 0;
  services.length = 0;
  updateUI();
}

document.addEventListener("DOMContentLoaded", generateHTML);
