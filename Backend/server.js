import express from 'express';
import cors from 'cors';
import http from 'http';
import sqlite3pkg from 'sqlite3';
const sqlite3 = sqlite3pkg.verbose();
const app = express();
app.use(cors());
// Conexión con la base de datos
const db = new sqlite3.Database("empresa.db", (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados: " + err.message);
  } else {
    console.log("Conectado ao banco de dados empresa.db.");
  }
});

db.run(
  `CREATE TABLE IF NOT EXISTS Migrantes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        pais TEXT NOT NULL,
        habilidades TEXT NOT NULL,
        email TEXT NOT NULL
    )`,
  (err) => {
    if (err) {
      console.error("Erro ao criar a tabela Migrantes: " + err.message);
    } else {
      console.log("Tabela Migrantes criada ou já existe.");
    }
  }
);
db.run(
  `CREATE TABLE IF NOT EXISTS Empresas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        sector TEXT NOT NULL,
        contacto TEXT NOT NULL,
        ayuda TEXT NOT NULL
    )`,
  (err) => {
    if (err) {
      console.error("Erro ao criar a tabela Empresas: " + err.message);
    } else {
      console.log("Tabela Empresas criada ou já existe.");
    }
  }
);

// Funciones para migrantes
const buscarMigrantes = (callback) => {
  db.all(`SELECT * FROM Migrantes`, [], (err, rows) => {
    if (err) {
      console.error("Erro ao buscar migrantes: " + err.message);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};
const adicionarMigrante = db.prepare(
  `INSERT INTO Migrantes (nombre, pais, habilidades, email) VALUES (?, ?, ?, ?)`,
  (err) => {
    if (err) {
      console.error("Erro ao preparar a consulta Migrantes: " + err.message);
    } else {
      console.log("Consulta Migrantes preparada com sucesso.");
    }
  }
);
const excluirMigrante = db.prepare(
  `DELETE FROM Migrantes WHERE id = ?`,
  (err) => {
    if (err) {
      console.error("Erro ao excluir migrante: " + err.message);
    }
  }
);
// PUT y PATCH para migrantes
const modificarMigrante = db.prepare(
  `UPDATE Migrantes SET nombre = ?, pais = ?, habilidades = ?, email = ? WHERE id = ?`,
  (err) => {
    if (err) {
      console.error("Erro ao preparar update migrante: " + err.message);
    }
  }
);

// Funciones para empresas
const buscarEmpresas = (callback) => {
  db.all(`SELECT * FROM Empresas`, [], (err, rows) => {
    if (err) {
      console.error("Erro ao buscar empresas: " + err.message);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};
const adicionarEmpresa = db.prepare(
  `INSERT INTO Empresas (nombre, sector, contacto, ayuda) VALUES (?, ?, ?, ?)`,
  (err) => {
    if (err) {
      console.error("Erro ao preparar a consulta Empresas: " + err.message);
    } else {
      console.log("Consulta Empresas preparada com sucesso.");
    }
  }
);
const excluirEmpresa = db.prepare(
  `DELETE FROM Empresas WHERE id = ?`,
  (err) => {
    if (err) {
      console.error("Erro ao excluir empresa: " + err.message);
    }
  }
);
// PUT y PATCH para empresas
const modificarEmpresa = db.prepare(
  `UPDATE Empresas SET nombre = ?, sector = ?, contacto = ?, ayuda = ? WHERE id = ?`,
  (err) => {
    if (err) {
      console.error("Erro ao preparar update empresa: " + err.message);
    }
  }
);

// Servidor HTTP
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Migrantes
  if (req.url.startsWith("/migrantes")) {
    if (req.method === "GET") {
      buscarMigrantes((err, rows) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Erro ao buscar migrantes: " + err.message }));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(rows));
        }
      });
    } else if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => { body += chunk.toString(); });
      req.on("end", () => {
        const parsedBody = JSON.parse(body);
        adicionarMigrante.run(
          parsedBody.nombre,
          parsedBody.pais,
          parsedBody.habilidades,
          parsedBody.email,
          (err) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Erro ao adicionar migrante: " + err.message }));
            } else {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Migrante salvo com sucesso!" }));
            }
          }
        );
      });
    } else if (req.method === "DELETE") {
      const urlParts = req.url.split("/");
      const id = urlParts[urlParts.length - 1];
      excluirMigrante.run(id, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Erro ao excluir migrante: " + err.message }));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Migrante excluído com sucesso!" }));
        }
      });
    } else if (req.method === "PUT" || req.method === "PATCH") {
      const urlParts = req.url.split("/");
      const id = urlParts[urlParts.length - 1];
      let body = "";
      req.on("data", (chunk) => { body += chunk.toString(); });
      req.on("end", () => {
        const parsedBody = JSON.parse(body);
        // Si es PATCH, solo actualiza los campos enviados
        if (req.method === "PATCH") {
          const campos = [];
          const valores = [];
          if (parsedBody.nombre !== undefined) { campos.push("nombre = ?"); valores.push(parsedBody.nombre); }
          if (parsedBody.pais !== undefined) { campos.push("pais = ?"); valores.push(parsedBody.pais); }
          if (parsedBody.habilidades !== undefined) { campos.push("habilidades = ?"); valores.push(parsedBody.habilidades); }
          if (parsedBody.email !== undefined) { campos.push("email = ?"); valores.push(parsedBody.email); }
          if (campos.length === 0) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "No se enviaron campos para actualizar." }));
            return;
          }
          valores.push(id);
          db.run(
            `UPDATE Migrantes SET ${campos.join(", ")} WHERE id = ?`,
            valores,
            (err) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Erro ao modificar migrante: " + err.message }));
              } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Migrante modificado com sucesso!" }));
              }
            }
          );
        } else {
          modificarMigrante.run(
            parsedBody.nombre,
            parsedBody.pais,
            parsedBody.habilidades,
            parsedBody.email,
            id,
            (err) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Erro ao modificar migrante: " + err.message }));
              } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Migrante modificado com sucesso!" }));
              }
            }
          );
        }
      });
    } else if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": 86400,
      });
      res.end();
      return;
    } else {
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Método não permitido." }));
    }
  // Empresas
  } else if (req.url.startsWith("/empresas")) {
    if (req.method === "GET") {
      buscarEmpresas((err, rows) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Erro ao buscar empresas: " + err.message }));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(rows));
        }
      });
    } else if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => { body += chunk.toString(); });
      req.on("end", () => {
        const parsedBody = JSON.parse(body);
        adicionarEmpresa.run(
          parsedBody.nombre,
          parsedBody.sector,
          parsedBody.contacto,
          parsedBody.ayuda,
          (err) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Erro ao adicionar empresa: " + err.message }));
            } else {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Empresa salva com sucesso!" }));
            }
          }
        );
      });
    } else if (req.method === "DELETE") {
      const urlParts = req.url.split("/");
      const id = urlParts[urlParts.length - 1];
      excluirEmpresa.run(id, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Erro ao excluir empresa: " + err.message }));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Empresa excluída com sucesso!" }));
        }
      });
    } else if (req.method === "PUT" || req.method === "PATCH") {
      const urlParts = req.url.split("/");
      const id = urlParts[urlParts.length - 1];
      let body = "";
      req.on("data", (chunk) => { body += chunk.toString(); });
      req.on("end", () => {
        const parsedBody = JSON.parse(body);
        // Si es PATCH, solo actualiza los campos enviados
        if (req.method === "PATCH") {
          const campos = [];
          const valores = [];
          if (parsedBody.nombre !== undefined) { campos.push("nombre = ?"); valores.push(parsedBody.nombre); }
          if (parsedBody.sector !== undefined) { campos.push("sector = ?"); valores.push(parsedBody.sector); }
          if (parsedBody.contacto !== undefined) { campos.push("contacto = ?"); valores.push(parsedBody.contacto); }
          if (parsedBody.ayuda !== undefined) { campos.push("ayuda = ?"); valores.push(parsedBody.ayuda); }
          if (campos.length === 0) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "No se enviaron campos para actualizar." }));
            return;
          }
          valores.push(id);
          db.run(
            `UPDATE Empresas SET ${campos.join(", ")} WHERE id = ?`,
            valores,
            (err) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Erro ao modificar empresa: " + err.message }));
              } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Empresa modificada com sucesso!" }));
              }
            }
          );
        } else {
          modificarEmpresa.run(
            parsedBody.nombre,
            parsedBody.sector,
            parsedBody.contacto,
            parsedBody.ayuda,
            id,
            (err) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Erro ao modificar empresa: " + err.message }));
              } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Empresa modificada com sucesso!" }));
              }
            }
          );
        }
      });
    } else if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": 86400,
      });
      res.end();
      return;
    } else {
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Método não permitido." }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Ruta no encontrada." }));
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
