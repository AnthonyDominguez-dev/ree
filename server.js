// ...dans app.get("/dashboard", ...)
res.send(layout("Imprimantes", `
  <h2>Gestion du parc d'imprimantes</h2>
  <form class="mb-3 d-flex" method="get">
    <input name="filter" class="form-control me-2" placeholder="Rechercher..." value="${filter}">
    <button class="btn btn-main">Filtrer</button>
  </form>
  <a href="/printer/new" class="btn btn-main mb-3">Ajouter une imprimante</a>
  <div style="overflow-x:auto;">
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Marque</th><th>Modèle</th><th>Numéro de série</th><th>Type</th>
        <th>IP</th><th>MAC</th><th>Emplacement</th><th>Utilisateur</th>
        <th>État</th><th>Date d’installation</th><th>Dernière maintenance</th>
        <th>Commentaires</th><th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${printers.map(p => `
      <tr>
        <td>${p.Marque || ""}</td>
        <td>${p["Modèle"] || ""}</td>
        <td>${p["Numéro de série"] || ""}</td>
        <td>${p.Type || ""}</td>
        <td>${p.IP || ""}</td>
        <td>${p.MAC || ""}</td>
        <td>${p.Emplacement || ""}</td>
        <td>${p.Utilisateur || ""}</td>
        <td>${p.État || ""}</td>
        <td>${p["Date d’installation"] || ""}</td>
        <td>${p["Dernière maintenance"] || ""}</td>
        <td>${p.Commentaires || ""}</td>
        <td>
          ${
            req.session.user.role === "admin"
              ? `
                <a href="/printer/edit/${p.id}" class="btn btn-sm btn-outline-main me-1">Éditer</a>
                <form method="POST" action="/printer/delete/${p.id}" style="display:inline;" onsubmit="return confirm('Supprimer cette imprimante ?');">
                  <button class="btn btn-sm btn-outline-danger">Supprimer</button>
                </form>
              `
              : `<span class="text-muted">Aucune action</span>`
          }
        </td>
      </tr>
      `).join("")}
    </tbody>
  </table>
  </div>
`, req.session.user));