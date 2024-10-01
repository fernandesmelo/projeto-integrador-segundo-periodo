let total = 0;
const services = []; // Array para armazenar os serviços selecionados

const servicos = [
  { categoria: 'Cabeleireiro', nome: 'Corte Feminino', preco: 65 },
  { categoria: 'Cabeleireiro', nome: 'Corte Masculino', preco: 45 },
  { categoria: 'Cabeleireiro', nome: 'Luzes', preco: 200 },
  { categoria: 'Cabeleireiro', nome: 'Escova', preco: 40 },
  { categoria: 'Cabeleireiro', nome: 'Barba / Design de Barba', preco: 40 },
  { categoria: 'Manicure e Pedicure', nome: 'Manicure', preco: 23 },
  { categoria: 'Manicure e Pedicure', nome: 'Esmaltação', preco: 13 },
  { categoria: 'Manicure e Pedicure', nome: 'Francesinha ou Inglesinha', preco: 5 },
  { categoria: 'Estética', nome: 'Drenagem Linfática Corporal Manual (por área)', preco: 65 }
];

function addService(preco, nome) {
  total += preco; // Adiciona o valor ao total
  services.push({ nome: nome, preco: preco }); // Adiciona o objeto do serviço ao array
  updateUI(); // Atualiza a interface
}

function removeService(preco, nome) {
  total -= preco; // Remove o valor do total
  const index = services.findIndex(service => service.nome === nome && service.preco === preco); // Encontra o índice do serviço
  if (index > -1) {
    services.splice(index, 1); // Remove o serviço do array
  }
  updateUI(); // Atualiza a interface
}

function updateUI() {
  document.getElementById("total-value").innerText = total.toFixed(2).replace('.', ','); // Atualiza o total na tela
  const servicesList = document.getElementById("services-list");
  servicesList.innerHTML = ""; // Limpa a lista atual
  services.forEach(service => {
    const listItem = document.createElement("li");
    listItem.innerText = `${service.nome} - R$ ${service.preco.toFixed(2).replace('.', ',')}`; // Adiciona o nome e o preço do serviço à lista
    servicesList.appendChild(listItem); // Adiciona o item à lista
  });
}

function toggleDropdown(category) {
  const content = document.getElementById(category);
  content.style.display = content.style.display === "block" ? "none" : "block";
}

function generateHTML() {
  const container = document.getElementById('servicos-container');
  const categorias = [...new Set(servicos.map(servico => servico.categoria))];

  categorias.forEach(categoria => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');

    const button = document.createElement('button');
    button.classList.add('category-btn');
    button.setAttribute('onclick', `toggleDropdown('${categoria}')`);
    button.innerHTML = `${categoria} <span class="arrow">▾</span>`;
    categoryDiv.appendChild(button);

    const contentDiv = document.createElement('div');
    contentDiv.id = categoria;
    contentDiv.classList.add('category-content');
    contentDiv.style.display = 'none';

    const ul = document.createElement('ul');
    ul.classList.add('subcategory');

    servicos.filter(servico => servico.categoria === categoria).forEach(servico => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${servico.nome} - <span class="preco">R$ ${servico.preco.toFixed(2).replace('.', ',')}</span>
        <div>
          <button class="remove-button" onclick="removeService(${servico.preco}, '${servico.nome}')">-</button>
          <button class="add-button" onclick="addService(${servico.preco}, '${servico.nome}')">+</button>
        </div>
      `;
      ul.appendChild(li);
    });

    contentDiv.appendChild(ul);
    categoryDiv.appendChild(contentDiv);
    container.appendChild(categoryDiv);
  });
}

document.addEventListener('DOMContentLoaded', generateHTML);

