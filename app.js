// Données simulées - Base de données JSON
let database = {
  users: [
    {"id": 1, "name": "Admin Principal", "email": "admin@entreprise.com", "role": "Admin", "password": "admin123", "lastLogin": "2024-12-01T10:30:00Z"},
    {"id": 2, "name": "Jean Dupont", "email": "jean.dupont@entreprise.com", "role": "Responsable", "password": "jean123", "lastLogin": "2024-12-01T09:15:00Z"},
    {"id": 3, "name": "Marie Martin", "email": "marie.martin@entreprise.com", "role": "Technicien", "password": "marie123", "lastLogin": "2024-12-01T08:45:00Z"},
    {"id": 4, "name": "Paul Durand", "email": "paul.durand@entreprise.com", "role": "Utilisateur", "password": "paul123", "lastLogin": "2024-11-30T16:20:00Z"}
  ],
  printers: [
    {"id": 1, "name": "HP LaserJet Pro M404", "serialNumber": "SN001HP2024", "ipAddress": "192.168.1.100", "location": "Bureau 101", "status": "Opérationnel", "brand": "HP", "model": "LaserJet Pro M404", "tonerLevel": 85, "pageCount": 12450, "lastMaintenance": "2024-11-15"},
    {"id": 2, "name": "Canon imageRUNNER", "serialNumber": "SN002CN2024", "ipAddress": "192.168.1.101", "location": "Salle de conférence", "status": "Maintenance requise", "brand": "Canon", "model": "imageRUNNER 2530i", "tonerLevel": 15, "pageCount": 8920, "lastMaintenance": "2024-10-20"},
    {"id": 3, "name": "Epson WorkForce Pro", "serialNumber": "SN003EP2024", "ipAddress": "192.168.1.102", "location": "Comptabilité", "status": "Opérationnel", "brand": "Epson", "model": "WorkForce Pro WF-4730", "tonerLevel": 60, "pageCount": 6780, "lastMaintenance": "2024-11-01"},
    {"id": 4, "name": "Brother HL-L3270CDW", "serialNumber": "SN004BR2024", "ipAddress": "192.168.1.103", "location": "Marketing", "status": "Hors service", "brand": "Brother", "model": "HL-L3270CDW", "tonerLevel": 0, "pageCount": 15600, "lastMaintenance": "2024-09-15"}
  ],
  tickets: [
    {"id": 1, "title": "Bourrage papier récurrent", "description": "L'imprimante HP bloque fréquemment avec du papier coincé", "printerSerialNumber": "SN001HP2024", "priority": "Haute", "status": "Ouvert", "assignedTo": "Marie Martin", "createdBy": "Paul Durand", "createdAt": "2024-12-01T09:30:00Z", "category": "Maintenance corrective"},
    {"id": 2, "title": "Toner vide", "description": "Remplacement nécessaire du toner noir", "printerSerialNumber": "SN002CN2024", "priority": "Moyenne", "status": "En cours", "assignedTo": "Marie Martin", "createdBy": "Jean Dupont", "createdAt": "2024-11-30T14:20:00Z", "category": "Consommables"},
    {"id": 3, "title": "Problème de connectivité", "description": "Impossible de se connecter à l'imprimante depuis le réseau", "printerSerialNumber": "SN004BR2024", "priority": "Critique", "status": "Fermé", "assignedTo": "Marie Martin", "createdBy": "Admin Principal", "createdAt": "2024-11-28T11:15:00Z", "resolvedAt": "2024-11-29T16:30:00Z", "category": "Réseau"}
  ],
  inventory: [
    {"id": 1, "name": "Toner HP 404A Noir", "reference": "CF270A", "category": "Toner", "compatiblePrinters": ["SN001HP2024"], "stock": 5, "minStock": 2, "unitPrice": 45.99, "supplier": "HP France"},
    {"id": 2, "name": "Toner Canon 045 Cyan", "reference": "1241C002", "category": "Toner", "compatiblePrinters": ["SN002CN2024"], "stock": 1, "minStock": 3, "unitPrice": 78.50, "supplier": "Canon Europe"},
    {"id": 3, "name": "Cartouche Epson 273XL Noir", "reference": "T273XL020", "category": "Encre", "compatiblePrinters": ["SN003EP2024"], "stock": 8, "minStock": 4, "unitPrice": 32.90, "supplier": "Epson France"},
    {"id": 4, "name": "Papier A4 80g", "reference": "PAP-A4-80", "category": "Papier", "compatiblePrinters": ["All"], "stock": 50, "minStock": 20, "unitPrice": 4.50, "supplier": "Bureau Vallée"}
  ],
  interventions: [
    {"id": 1, "ticketId": 3, "printerSerialNumber": "SN004BR2024", "technicianName": "Marie Martin", "startTime": "2024-11-29T10:00:00Z", "endTime": "2024-11-29T16:30:00Z", "description": "Remplacement de la carte réseau défectueuse", "type": "Corrective", "partsUsed": [], "cost": 120.00},
    {"id": 2, "ticketId": 1, "printerSerialNumber": "SN001HP2024", "technicianName": "Marie Martin", "startTime": "2024-12-01T10:00:00Z", "endTime": "2024-12-01T11:30:00Z", "description": "Nettoyage des rouleaux d'entraînement", "type": "Préventive", "partsUsed": [], "cost": 45.00},
    {"id": 3, "ticketId": 2, "printerSerialNumber": "SN002CN2024", "technicianName": "Marie Martin", "startTime": "2024-11-30T15:00:00Z", "endTime": "2024-11-30T15:45:00Z", "description": "Remplacement toner noir", "type": "Consommables", "partsUsed": ["Toner Canon 045 Noir"], "cost": 78.50}
  ]
};

// Variables globales
let currentUser = null;
let charts = {};

// Utilitaires
function generateId(collection) {
  return Math.max(...database[collection].map(item => item.id || 0)) + 1;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('fr-FR');
}

function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString('fr-FR');
}

function showAlert(message, type = 'success') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  const container = document.querySelector('.main-content .page.active');
  if (container) {
    container.insertBefore(alertDiv, container.firstChild);
    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  }
}

// Authentification
function login(email, password) {
  const user = database.users.find(u => u.email === email && u.password === password);
  if (user) {
    currentUser = user;
    // Simuler un token JWT
    sessionStorage.setItem('token', btoa(JSON.stringify({userId: user.id, role: user.role})));
    return true;
  }
  return false;
}

function logout() {
  currentUser = null;
  sessionStorage.removeItem('token');
  showLoginPage();
}

function checkAuth() {
  const token = sessionStorage.getItem('token');
  if (token) {
    try {
      const data = JSON.parse(atob(token));
      currentUser = database.users.find(u => u.id === data.userId);
      return currentUser !== null;
    } catch (e) {
      sessionStorage.removeItem('token');
      return false;
    }
  }
  return false;
}

function hasPermission(requiredRole) {
  if (!currentUser) return false;
  const roles = ['Utilisateur', 'Technicien', 'Responsable', 'Admin'];
  const userLevel = roles.indexOf(currentUser.role);
  const requiredLevel = roles.indexOf(requiredRole);
  return userLevel >= requiredLevel;
}

// Navigation
function showLoginPage() {
  document.getElementById('loginPage').classList.remove('d-none');
  document.getElementById('appContainer').classList.add('d-none');
}

function showApp() {
  document.getElementById('loginPage').classList.add('d-none');
  document.getElementById('appContainer').classList.remove('d-none');
  
  // Afficher le menu utilisateurs pour les admins
  if (hasPermission('Admin')) {
    document.getElementById('usersMenuItem').classList.remove('d-none');
  }
  
  // Mettre à jour les infos utilisateur
  document.getElementById('currentUserName').textContent = currentUser.name;
  document.getElementById('currentUserRole').textContent = currentUser.role;
  
  showPage('dashboard');
}

function showPage(pageId) {
  // Masquer toutes les pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Afficher la page demandée
  document.getElementById(pageId + 'Page').classList.add('active');
  
  // Mettre à jour la navigation
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.classList.remove('active');
  });
  document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
  
  // Charger les données de la page
  switch (pageId) {
    case 'dashboard':
      loadDashboard();
      break;
    case 'printers':
      loadPrinters();
      break;
    case 'tickets':
      loadTickets();
      break;
    case 'inventory':
      loadInventory();
      break;
    case 'statistics':
      loadStatistics();
      break;
    case 'users':
      if (hasPermission('Admin')) {
        loadUsers();
      }
      break;
  }
}

// Dashboard
function loadDashboard() {
  // Calculer les statistiques
  const totalPrinters = database.printers.length;
  const operationalPrinters = database.printers.filter(p => p.status === 'Opérationnel').length;
  const openTickets = database.tickets.filter(t => t.status !== 'Fermé').length;
  const lowStockItems = database.inventory.filter(i => i.stock <= i.minStock).length;
  
  // Mettre à jour les cartes
  document.getElementById('totalPrinters').textContent = totalPrinters;
  document.getElementById('operationalPrinters').textContent = operationalPrinters;
  document.getElementById('openTickets').textContent = openTickets;
  document.getElementById('lowStockItems').textContent = lowStockItems;
  
  // Graphique statut des imprimantes
  const statusData = {};
  database.printers.forEach(printer => {
    statusData[printer.status] = (statusData[printer.status] || 0) + 1;
  });
  
  if (charts.printersStatus) charts.printersStatus.destroy();
  charts.printersStatus = new Chart(document.getElementById('printersStatusChart'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(statusData),
      datasets: [{
        data: Object.values(statusData),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
  
  // Graphique priorité des tickets
  const priorityData = {};
  database.tickets.forEach(ticket => {
    priorityData[ticket.priority] = (priorityData[ticket.priority] || 0) + 1;
  });
  
  if (charts.ticketsPriority) charts.ticketsPriority.destroy();
  charts.ticketsPriority = new Chart(document.getElementById('ticketsPriorityChart'), {
    type: 'bar',
    data: {
      labels: Object.keys(priorityData),
      datasets: [{
        data: Object.values(priorityData),
        backgroundColor: ['#5D878F', '#DB4545', '#D2BA4C', '#964325']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Gestion des imprimantes
function loadPrinters() {
  const tbody = document.getElementById('printersTableBody');
  tbody.innerHTML = '';
  
  database.printers.forEach(printer => {
    const statusBadge = getStatusBadge(printer.status);
    const tonerBar = getTonerProgressBar(printer.tonerLevel);
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${printer.name}</td>
      <td><code>${printer.serialNumber}</code></td>
      <td>${printer.brand}</td>
      <td>${printer.location}</td>
      <td>${statusBadge}</td>
      <td>${tonerBar}</td>
      <td>
        <button class="btn btn-outline-primary btn-sm" onclick="editPrinter(${printer.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-outline-danger btn-sm" onclick="deletePrinter(${printer.id})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function getStatusBadge(status) {
  const badges = {
    'Opérationnel': 'badge-success',
    'Maintenance requise': 'badge-warning',
    'Hors service': 'badge-danger'
  };
  return `<span class="badge ${badges[status] || 'badge-secondary'}">${status}</span>`;
}

function getTonerProgressBar(level) {
  let colorClass = 'progress-bar-success';
  if (level < 20) colorClass = 'progress-bar-danger';
  else if (level < 50) colorClass = 'progress-bar-warning';
  
  return `
    <div class="progress" style="height: 20px;">
      <div class="progress-bar ${colorClass}" style="width: ${level}%">
        ${level}%
      </div>
    </div>
  `;
}

function editPrinter(id) {
  const printer = database.printers.find(p => p.id === id);
  if (printer) {
    document.getElementById('printerId').value = printer.id;
    document.getElementById('printerName').value = printer.name;
    document.getElementById('printerSerial').value = printer.serialNumber;
    document.getElementById('printerIP').value = printer.ipAddress || '';
    document.getElementById('printerLocation').value = printer.location || '';
    document.getElementById('printerBrand').value = printer.brand || '';
    document.getElementById('printerModel').value = printer.model || '';
    document.getElementById('printerStatus').value = printer.status;
    
    new bootstrap.Modal(document.getElementById('printerModal')).show();
  }
}

function deletePrinter(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette imprimante ?')) {
    database.printers = database.printers.filter(p => p.id !== id);
    loadPrinters();
    showAlert('Imprimante supprimée avec succès', 'success');
  }
}

// Gestion des tickets
function loadTickets() {
  const tbody = document.getElementById('ticketsTableBody');
  tbody.innerHTML = '';
  
  database.tickets.forEach(ticket => {
    const printer = database.printers.find(p => p.serialNumber === ticket.printerSerialNumber);
    const priorityBadge = getPriorityBadge(ticket.priority);
    const statusBadge = getTicketStatusBadge(ticket.status);
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>#${ticket.id}</td>
      <td>${ticket.title}</td>
      <td>${printer ? printer.name : ticket.printerSerialNumber}</td>
      <td>${priorityBadge}</td>
      <td>${statusBadge}</td>
      <td>${ticket.assignedTo || 'Non assigné'}</td>
      <td>
        <button class="btn btn-outline-primary btn-sm" onclick="editTicket(${ticket.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-outline-danger btn-sm" onclick="deleteTicket(${ticket.id})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
  
  // Charger les imprimantes dans le select du modal
  const printerSelect = document.getElementById('ticketPrinter');
  printerSelect.innerHTML = '<option value="">Sélectionner une imprimante</option>';
  database.printers.forEach(printer => {
    printerSelect.innerHTML += `<option value="${printer.serialNumber}">${printer.name} (${printer.serialNumber})</option>`;
  });
}

function getPriorityBadge(priority) {
  const badges = {
    'Basse': 'badge-secondary',
    'Moyenne': 'badge-warning',
    'Haute': 'badge-primary',
    'Critique': 'badge-danger'
  };
  return `<span class="badge ${badges[priority] || 'badge-secondary'}">${priority}</span>`;
}

function getTicketStatusBadge(status) {
  const badges = {
    'Ouvert': 'badge-danger',
    'En cours': 'badge-warning',
    'Fermé': 'badge-success'
  };
  return `<span class="badge ${badges[status] || 'badge-secondary'}">${status}</span>`;
}

function editTicket(id) {
  const ticket = database.tickets.find(t => t.id === id);
  if (ticket) {
    document.getElementById('ticketId').value = ticket.id;
    document.getElementById('ticketTitle').value = ticket.title;
    document.getElementById('ticketDescription').value = ticket.description || '';
    document.getElementById('ticketPrinter').value = ticket.printerSerialNumber || '';
    document.getElementById('ticketPriority').value = ticket.priority;
    document.getElementById('ticketCategory').value = ticket.category || '';
    
    new bootstrap.Modal(document.getElementById('ticketModal')).show();
  }
}

function deleteTicket(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce ticket ?')) {
    database.tickets = database.tickets.filter(t => t.id !== id);
    loadTickets();
    showAlert('Ticket supprimé avec succès', 'success');
  }
}

// Gestion de l'inventaire
function loadInventory() {
  const tbody = document.getElementById('inventoryTableBody');
  tbody.innerHTML = '';
  
  database.inventory.forEach(item => {
    const stockStatus = item.stock <= item.minStock ? 'text-danger fw-bold' : '';
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td><code>${item.reference}</code></td>
      <td>${item.category}</td>
      <td class="${stockStatus}">${item.stock}</td>
      <td>${item.minStock}</td>
      <td>${item.unitPrice.toFixed(2)} €</td>
      <td>
        <button class="btn btn-outline-primary btn-sm" onclick="editInventoryItem(${item.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-outline-danger btn-sm" onclick="deleteInventoryItem(${item.id})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editInventoryItem(id) {
  const item = database.inventory.find(i => i.id === id);
  if (item) {
    document.getElementById('inventoryId').value = item.id;
    document.getElementById('inventoryName').value = item.name;
    document.getElementById('inventoryReference').value = item.reference || '';
    document.getElementById('inventoryCategory').value = item.category;
    document.getElementById('inventoryStock').value = item.stock;
    document.getElementById('inventoryMinStock').value = item.minStock;
    document.getElementById('inventoryPrice').value = item.unitPrice;
    
    new bootstrap.Modal(document.getElementById('inventoryModal')).show();
  }
}

function deleteInventoryItem(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
    database.inventory = database.inventory.filter(i => i.id !== id);
    loadInventory();
    showAlert('Article supprimé avec succès', 'success');
  }
}

// Statistiques détaillées
function loadStatistics() {
  loadInterventionStats();
  loadPrinterStats();
  loadTicketStats();
  loadStockStats();
}

function loadInterventionStats() {
  const interventions = database.interventions;
  const totalInterventions = interventions.length;
  
  // MTTR (temps moyen de résolution en heures)
  let totalTime = 0;
  interventions.forEach(intervention => {
    const start = new Date(intervention.startTime);
    const end = new Date(intervention.endTime);
    totalTime += (end - start) / (1000 * 60 * 60); // en heures
  });
  const avgResolutionTime = totalTime / totalInterventions || 0;
  
  // Taux de résolution
  const resolvedTickets = database.tickets.filter(t => t.status === 'Fermé').length;
  const resolutionRate = (resolvedTickets / database.tickets.length * 100) || 0;
  
  // Coût moyen
  const avgCost = interventions.reduce((sum, i) => sum + (i.cost || 0), 0) / totalInterventions || 0;
  
  document.getElementById('totalInterventions').textContent = totalInterventions;
  document.getElementById('avgResolutionTime').textContent = avgResolutionTime.toFixed(1) + 'h';
  document.getElementById('resolutionRate').textContent = resolutionRate.toFixed(1) + '%';
  document.getElementById('avgInterventionCost').textContent = avgCost.toFixed(2) + '€';
  
  // Graphique des interventions par type
  const typeData = {};
  interventions.forEach(intervention => {
    typeData[intervention.type] = (typeData[intervention.type] || 0) + 1;
  });
  
  if (charts.interventions) charts.interventions.destroy();
  charts.interventions = new Chart(document.getElementById('interventionsChart'), {
    type: 'bar',
    data: {
      labels: Object.keys(typeData),
      datasets: [{
        label: 'Nombre d\'interventions',
        data: Object.values(typeData),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

function loadPrinterStats() {
  const printers = database.printers;
  const totalPark = printers.length;
  const operational = printers.filter(p => p.status === 'Opérationnel').length;
  const availabilityRate = (operational / totalPark * 100) || 0;
  
  // MTBF simulé (en jours)
  const mtbf = 45; // Valeur simulée
  
  // Niveau toner moyen
  const avgToner = printers.reduce((sum, p) => sum + p.tonerLevel, 0) / totalPark || 0;
  
  document.getElementById('totalParkSize').textContent = totalPark;
  document.getElementById('availabilityRate').textContent = availabilityRate.toFixed(1) + '%';
  document.getElementById('mtbf').textContent = mtbf + 'j';
  document.getElementById('avgTonerLevel').textContent = avgToner.toFixed(1) + '%';
  
  // Répartition par marque
  const brandData = {};
  printers.forEach(printer => {
    brandData[printer.brand] = (brandData[printer.brand] || 0) + 1;
  });
  
  if (charts.brandDistribution) charts.brandDistribution.destroy();
  charts.brandDistribution = new Chart(document.getElementById('brandDistributionChart'), {
    type: 'pie',
    data: {
      labels: Object.keys(brandData),
      datasets: [{
        data: Object.values(brandData),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Répartition par marque'
        }
      }
    }
  });
  
  // Statut détaillé
  const statusData = {};
  printers.forEach(printer => {
    statusData[printer.status] = (statusData[printer.status] || 0) + 1;
  });
  
  if (charts.printerStatusDetail) charts.printerStatusDetail.destroy();
  charts.printerStatusDetail = new Chart(document.getElementById('printerStatusDetailChart'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(statusData),
      datasets: [{
        data: Object.values(statusData),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'État des imprimantes'
        }
      }
    }
  });
}

function loadTicketStats() {
  const tickets = database.tickets;
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status !== 'Fermé').length;
  
  // Temps de réponse moyen (simulé)
  const avgResponseTime = 2.5; // heures
  
  // Tickets ce mois-ci
  const currentMonth = new Date().getMonth();
  const thisMonthTickets = tickets.filter(t => 
    new Date(t.createdAt).getMonth() === currentMonth
  ).length;
  
  document.getElementById('totalTickets').textContent = totalTickets;
  document.getElementById('openTicketsCount').textContent = openTickets;
  document.getElementById('avgResponseTime').textContent = avgResponseTime + 'h';
  document.getElementById('ticketsThisMonth').textContent = thisMonthTickets;
  
  // Tickets par priorité
  const priorityData = {};
  tickets.forEach(ticket => {
    priorityData[ticket.priority] = (priorityData[ticket.priority] || 0) + 1;
  });
  
  if (charts.ticketsByPriority) charts.ticketsByPriority.destroy();
  charts.ticketsByPriority = new Chart(document.getElementById('ticketsByPriorityChart'), {
    type: 'bar',
    data: {
      labels: Object.keys(priorityData),
      datasets: [{
        label: 'Nombre de tickets',
        data: Object.values(priorityData),
        backgroundColor: ['#5D878F', '#FFC185', '#B4413C', '#964325']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Tickets par priorité'
        },
        legend: {
          display: false
        }
      }
    }
  });
  
  // Tickets par statut
  const statusData = {};
  tickets.forEach(ticket => {
    statusData[ticket.status] = (statusData[ticket.status] || 0) + 1;
  });
  
  if (charts.ticketsByStatus) charts.ticketsByStatus.destroy();
  charts.ticketsByStatus = new Chart(document.getElementById('ticketsByStatusChart'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(statusData),
      datasets: [{
        data: Object.values(statusData),
        backgroundColor: ['#B4413C', '#FFC185', '#1FB8CD']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Tickets par statut'
        }
      }
    }
  });
}

function loadStockStats() {
  const inventory = database.inventory;
  const totalItems = inventory.length;
  const lowStockItems = inventory.filter(i => i.stock <= i.minStock).length;
  const totalValue = inventory.reduce((sum, i) => sum + (i.stock * i.unitPrice), 0);
  
  // Coût moyen par page (simulé)
  const avgCostPerPage = 0.03; // euros
  
  document.getElementById('totalStockItems').textContent = totalItems;
  document.getElementById('lowStockAlerts').textContent = lowStockItems;
  document.getElementById('totalStockValue').textContent = totalValue.toFixed(2) + '€';
  document.getElementById('avgCostPerPage').textContent = avgCostPerPage.toFixed(3) + '€';
  
  // Stock par catégorie
  const categoryData = {};
  inventory.forEach(item => {
    categoryData[item.category] = (categoryData[item.category] || 0) + item.stock;
  });
  
  if (charts.stockByCategory) charts.stockByCategory.destroy();
  charts.stockByCategory = new Chart(document.getElementById('stockByCategoryChart'), {
    type: 'bar',
    data: {
      labels: Object.keys(categoryData),
      datasets: [{
        label: 'Quantité en stock',
        data: Object.values(categoryData),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Stock par catégorie'
        },
        legend: {
          display: false
        }
      }
    }
  });
  
  // Niveaux de stock
  const stockLevels = inventory.map(item => ({
    name: item.name,
    current: item.stock,
    min: item.minStock
  }));
  
  if (charts.stockLevels) charts.stockLevels.destroy();
  charts.stockLevels = new Chart(document.getElementById('stockLevelsChart'), {
    type: 'bar',
    data: {
      labels: stockLevels.map(s => s.name.substring(0, 15)),
      datasets: [{
        label: 'Stock actuel',
        data: stockLevels.map(s => s.current),
        backgroundColor: '#1FB8CD'
      }, {
        label: 'Stock minimum',
        data: stockLevels.map(s => s.min),
        backgroundColor: '#B4413C'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Niveaux de stock'
        }
      }
    }
  });
}

// Gestion des utilisateurs
function loadUsers() {
  if (!hasPermission('Admin')) return;
  
  const tbody = document.getElementById('usersTableBody');
  tbody.innerHTML = '';
  
  database.users.forEach(user => {
    const roleBadge = getRoleBadge(user.role);
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${roleBadge}</td>
      <td>${formatDateTime(user.lastLogin)}</td>
      <td>
        <button class="btn btn-outline-primary btn-sm" onclick="editUser(${user.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-outline-danger btn-sm" onclick="deleteUser(${user.id})" ${user.id === currentUser.id ? 'disabled' : ''}>
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function getRoleBadge(role) {
  const badges = {
    'Admin': 'badge-danger',
    'Responsable': 'badge-warning',
    'Technicien': 'badge-primary',
    'Utilisateur': 'badge-secondary'
  };
  return `<span class="badge ${badges[role] || 'badge-secondary'}">${role}</span>`;
}

function editUser(id) {
  const user = database.users.find(u => u.id === id);
  if (user) {
    document.getElementById('userId').value = user.id;
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userRole').value = user.role;
    document.getElementById('userPassword').value = '';
    
    new bootstrap.Modal(document.getElementById('userModal')).show();
  }
}

function deleteUser(id) {
  if (id === currentUser.id) {
    showAlert('Vous ne pouvez pas supprimer votre propre compte', 'danger');
    return;
  }
  
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    database.users = database.users.filter(u => u.id !== id);
    loadUsers();
    showAlert('Utilisateur supprimé avec succès', 'success');
  }
}

// Gestionnaires d'événements
document.addEventListener('DOMContentLoaded', function() {
  // Vérifier l'authentification au chargement
  if (checkAuth()) {
    showApp();
  } else {
    showLoginPage();
  }
  
  // Formulaire de connexion
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (login(email, password)) {
      showApp();
    } else {
      showAlert('Email ou mot de passe incorrect', 'danger');
    }
  });
  
  // Navigation
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      showPage(page);
    });
  });
  
  // Déconnexion
  document.getElementById('logoutBtn').addEventListener('click', logout);
  
  // Formulaires modaux
  document.getElementById('printerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('printerId').value;
    const printer = {
      name: document.getElementById('printerName').value,
      serialNumber: document.getElementById('printerSerial').value,
      ipAddress: document.getElementById('printerIP').value,
      location: document.getElementById('printerLocation').value,
      brand: document.getElementById('printerBrand').value,
      model: document.getElementById('printerModel').value,
      status: document.getElementById('printerStatus').value,
      tonerLevel: Math.floor(Math.random() * 100), // Simulé
      pageCount: Math.floor(Math.random() * 20000), // Simulé
      lastMaintenance: new Date().toISOString().split('T')[0]
    };
    
    if (id) {
      // Modification
      const index = database.printers.findIndex(p => p.id == id);
      if (index !== -1) {
        database.printers[index] = { ...database.printers[index], ...printer };
      }
    } else {
      // Ajout
      printer.id = generateId('printers');
      database.printers.push(printer);
    }
    
    bootstrap.Modal.getInstance(document.getElementById('printerModal')).hide();
    loadPrinters();
    showAlert('Imprimante enregistrée avec succès', 'success');
  });
  
  document.getElementById('ticketForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('ticketId').value;
    const ticket = {
      title: document.getElementById('ticketTitle').value,
      description: document.getElementById('ticketDescription').value,
      printerSerialNumber: document.getElementById('ticketPrinter').value,
      priority: document.getElementById('ticketPriority').value,
      category: document.getElementById('ticketCategory').value,
      status: 'Ouvert',
      createdBy: currentUser.name,
      createdAt: new Date().toISOString()
    };
    
    if (id) {
      // Modification
      const index = database.tickets.findIndex(t => t.id == id);
      if (index !== -1) {
        database.tickets[index] = { ...database.tickets[index], ...ticket };
      }
    } else {
      // Ajout
      ticket.id = generateId('tickets');
      database.tickets.push(ticket);
    }
    
    bootstrap.Modal.getInstance(document.getElementById('ticketModal')).hide();
    loadTickets();
    showAlert('Ticket enregistré avec succès', 'success');
  });
  
  document.getElementById('inventoryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('inventoryId').value;
    const item = {
      name: document.getElementById('inventoryName').value,
      reference: document.getElementById('inventoryReference').value,
      category: document.getElementById('inventoryCategory').value,
      stock: parseInt(document.getElementById('inventoryStock').value) || 0,
      minStock: parseInt(document.getElementById('inventoryMinStock').value) || 0,
      unitPrice: parseFloat(document.getElementById('inventoryPrice').value) || 0,
      supplier: 'Fournisseur par défaut'
    };
    
    if (id) {
      // Modification
      const index = database.inventory.findIndex(i => i.id == id);
      if (index !== -1) {
        database.inventory[index] = { ...database.inventory[index], ...item };
      }
    } else {
      // Ajout
      item.id = generateId('inventory');
      database.inventory.push(item);
    }
    
    bootstrap.Modal.getInstance(document.getElementById('inventoryModal')).hide();
    loadInventory();
    showAlert('Article enregistré avec succès', 'success');
  });
  
  document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!hasPermission('Admin')) return;
    
    const id = document.getElementById('userId').value;
    const user = {
      name: document.getElementById('userName').value,
      email: document.getElementById('userEmail').value,
      role: document.getElementById('userRole').value
    };
    
    const password = document.getElementById('userPassword').value;
    if (password) {
      user.password = password;
    }
    
    if (id) {
      // Modification
      const index = database.users.findIndex(u => u.id == id);
      if (index !== -1) {
        database.users[index] = { ...database.users[index], ...user };
      }
    } else {
      // Ajout
      user.id = generateId('users');
      user.password = user.password || 'password123';
      user.lastLogin = new Date().toISOString();
      database.users.push(user);
    }
    
    bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();
    loadUsers();
    showAlert('Utilisateur enregistré avec succès', 'success');
  });
  
  // Reset des formulaires quand les modals se ferment
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('hidden.bs.modal', function() {
      const form = this.querySelector('form');
      if (form) {
        form.reset();
        // Reset des champs cachés
        form.querySelectorAll('input[type="hidden"]').forEach(input => {
          input.value = '';
        });
      }
    });
  });
});