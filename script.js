const form = document.getElementById('client-form');
const tableBody = document.querySelector('#client-table tbody');

let clients = JSON.parse(localStorage.getItem('clients')) || [];

function saveClients() {
  localStorage.setItem('clients', JSON.stringify(clients));
}

function renderClients(searchTerm = '') {
  tableBody.innerHTML = '';

  const filteredClients = clients.filter(client => {
    return (
      client.name.toLowerCase().includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm) ||
      client.company.toLowerCase().includes(searchTerm)
    );
  });

  filteredClients.forEach((client, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>${client.company}</td>
      <td><button class="delete-btn" onclick="deleteClient(${index})">Eliminar</button></td>
    `;
    tableBody.appendChild(row);
  });
}


function deleteClient(index) {
  clients.splice(index, 1);
  saveClients();
  renderClients();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const company = document.getElementById('company').value.trim();

  const exists = clients.some(c => c.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    alert("Este cliente ya fue agregado con ese email.");
    return;
  }

  if (name && email && company) {
    clients.push({ name, email, company });
    saveClients();
    renderClients();
    form.reset();
  }
});
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', function () {
  const term = searchInput.value.toLowerCase();
  renderClients(term);
});


renderClients(); // 👈 Esta línea es CLAVE para mostrar los datos al cargar
