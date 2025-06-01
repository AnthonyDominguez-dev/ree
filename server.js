const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const DB_PATH = path.join(__dirname, 'db.json');

app.use(express.json());
app.use(express.static('public'));

// Helper : lire et écrire la base JSON
function readDb() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}
function writeDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

// AUTH simple (POST /api/login)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  const user = db.users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
  } else {
    res.status(401).json({ success: false, message: 'Identifiants invalides' });
  }
});

// CRUD endpoints génériques pour chaque collection
['users', 'printers', 'tickets', 'inventory', 'interventions'].forEach(collection => {
  // GET ALL
  app.get(`/api/${collection}`, (req, res) => {
    const db = readDb();
    res.json(db[collection] || []);
  });

  // GET by ID
  app.get(`/api/${collection}/:id`, (req, res) => {
    const db = readDb();
    const item = (db[collection] || []).find(i => i.id == req.params.id);
    if (item) res.json(item);
    else res.status(404).end();
  });

  // CREATE
  app.post(`/api/${collection}`, (req, res) => {
    const db = readDb();
    const items = db[collection] || [];
    const newId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
    const newItem = { ...req.body, id: newId };
    items.push(newItem);
    db[collection] = items;
    writeDb(db);
    res.status(201).json(newItem);
  });

  // UPDATE
  app.put(`/api/${collection}/:id`, (req, res) => {
    const db = readDb();
    let items = db[collection] || [];
    const idx = items.findIndex(i => i.id == req.params.id);
    if (idx === -1) return res.status(404).end();
    items[idx] = { ...items[idx], ...req.body, id: Number(req.params.id) };
    db[collection] = items;
    writeDb(db);
    res.json(items[idx]);
  });

  // DELETE
  app.delete(`/api/${collection}/:id`, (req, res) => {
    const db = readDb();
    let items = db[collection] || [];
    const idx = items.findIndex(i => i.id == req.params.id);
    if (idx === -1) return res.status(404).end();
    const deleted = items.splice(idx, 1)[0];
    db[collection] = items;
    writeDb(db);
    res.json(deleted);
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur Node.js démarré sur le port ${PORT}`);
});