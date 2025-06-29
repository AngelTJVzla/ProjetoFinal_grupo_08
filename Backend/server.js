import express from 'express';
import cors from 'cors';
import sqlite3pkg from 'sqlite3';
const sqlite3 = sqlite3pkg.verbose();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Middleware para manejo de errores JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'JSON inválido' });
  }
  next();
});

// Middleware para validaciones
const validateMigrante = (data) => {
  const errors = [];
  if (!data.nombre || data.nombre.trim() === '') errors.push('Nome é obrigatório');
  if (!data.pais || data.pais.trim() === '') errors.push('País é obrigatório');
  if (!data.habilidades || data.habilidades.trim() === '') errors.push('Habilidades são obrigatórias');
  if (!data.email || data.email.trim() === '') errors.push('Email é obrigatório');
  if (data.email && !data.email.includes('@')) errors.push('Email deve ter formato válido');
  return errors;
};

const validateEmpresa = (data) => {
  const errors = [];
  if (!data.nombre || data.nombre.trim() === '') errors.push('Nome é obrigatório');
  if (!data.sector || data.sector.trim() === '') errors.push('Setor é obrigatório');
  if (!data.contacto || data.contacto.trim() === '') errors.push('Contato é obrigatório');
  if (!data.ayuda || data.ayuda.trim() === '') errors.push('Ajuda é obrigatória');
  return errors;
};
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
        email TEXT NOT NULL,
        cpf TEXT
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
        ayuda TEXT NOT NULL,
        cnpj TEXT
    )`,
  (err) => {
    if (err) {
      console.error("Erro ao criar a tabela Empresas: " + err.message);
    } else {
      console.log("Tabela Empresas criada ou já existe.");
    }
  }
);

// Funciones genéricas para entidades
const createCRUDOperations = (tableName, fields) => {
  return {
    buscar: (callback) => {
      db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
        if (err) {
          console.error(`Erro ao buscar ${tableName.toLowerCase()}: ` + err.message);
          callback(err, null);
        } else {
          callback(null, rows);
        }
      });
    },

    adicionar: db.prepare(
      `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`,
      (err) => {
        if (err) {
          console.error(`Erro ao preparar a consulta ${tableName}: ` + err.message);
        } else {
          console.log(`Consulta ${tableName} preparada com sucesso.`);
        }
      }
    ),

    excluir: db.prepare(
      `DELETE FROM ${tableName} WHERE id = ?`,
      (err) => {
        if (err) {
          console.error(`Erro ao excluir ${tableName.toLowerCase()}: ` + err.message);
        }
      }
    ),

    modificar: db.prepare(
      `UPDATE ${tableName} SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE id = ?`,
      (err) => {
        if (err) {
          console.error(`Erro ao preparar update ${tableName.toLowerCase()}: ` + err.message);
        }
      }
    )
  };
};

// Operaciones CRUD para ambas entidades
const migrantesOps = createCRUDOperations('Migrantes', ['nombre', 'pais', 'habilidades', 'email', 'cpf']);
const empresasOps = createCRUDOperations('Empresas', ['nombre', 'sector', 'contacto', 'ayuda', 'cnpj']);

// Funciones de conveniencia (manteniendo compatibilidad)
const buscarMigrantes = migrantesOps.buscar;
const adicionarMigrante = migrantesOps.adicionar;
const excluirMigrante = migrantesOps.excluir;
const modificarMigrante = migrantesOps.modificar;

const buscarEmpresas = empresasOps.buscar;
const adicionarEmpresa = empresasOps.adicionar;
const excluirEmpresa = empresasOps.excluir;
const modificarEmpresa = empresasOps.modificar;

// Rutas genéricas para CRUD con Express
const createExpressRoutes = (entityName, operations, validator) => {
  const router = express.Router();
  const entityNameLower = entityName.toLowerCase();

  // GET - Listar todos
  router.get('/', (req, res) => {
    operations.buscar((err, rows) => {
      if (err) {
        return res.status(500).json({ error: `Erro ao buscar ${entityNameLower}: ` + err.message });
      }
      res.json(rows);
    });
  });

  // POST - Crear nuevo
  router.post('/', (req, res) => {
    const validationErrors = validator(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: "Dados inválidos", details: validationErrors });
    }

    const values = entityName === 'Migrantes' 
      ? [req.body.nombre, req.body.pais, req.body.habilidades, req.body.email, req.body.cpf]
      : [req.body.nombre, req.body.sector, req.body.contacto, req.body.ayuda, req.body.cnpj];

    operations.adicionar.run(...values, function(err) {
      if (err) {
        console.error(`Erro ao adicionar ${entityNameLower}:`, err.message, req.body);
        return res.status(500).json({ error: `Erro ao adicionar ${entityNameLower}: ` + err.message });
      }
      
      // Retornar el registro insertado
      db.get(`SELECT * FROM ${entityName} WHERE id = ?`, [this.lastID], (err2, row) => {
        if (err2) {
          return res.json({ 
            message: `${entityName} salvo com sucesso!`, 
            warning: `No se pudo retornar el ${entityNameLower} insertado.`,
            id: this.lastID
          });
        }
        res.json({ 
          message: `${entityName} salvo com sucesso!`, 
          [entityNameLower]: row 
        });
      });
    });
  });

  // GET by ID - Buscar por ID
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM ${entityName} WHERE id = ?`, [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: `Erro ao buscar ${entityNameLower}: ` + err.message });
      }
      if (!row) {
        return res.status(404).json({ error: `${entityName} não encontrado` });
      }
      res.json(row);
    });
  });

  // PUT - Actualizar completo
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const validationErrors = validator(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: "Dados inválidos", details: validationErrors });
    }

    const values = entityName === 'Migrantes' 
      ? [req.body.nombre, req.body.pais, req.body.habilidades, req.body.email, req.body.cpf, id]
      : [req.body.nombre, req.body.sector, req.body.contacto, req.body.ayuda, req.body.cnpj, id];

    operations.modificar.run(...values, function(err) {
      if (err) {
        return res.status(500).json({ error: `Erro ao modificar ${entityNameLower}: ` + err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: `${entityName} não encontrado` });
      }
      res.json({ message: `${entityName} modificado com sucesso!` });
    });
  });

  // PATCH - Actualizar parcial
  router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const fields = entityName === 'Migrantes' 
      ? ['nombre', 'pais', 'habilidades', 'email', 'cpf']
      : ['nombre', 'sector', 'contacto', 'ayuda', 'cnpj'];
    
    const campos = [];
    const valores = [];
    
    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        campos.push(`${field} = ?`);
        valores.push(req.body[field]);
      }
    });

    if (campos.length === 0) {
      return res.status(400).json({ error: "No se enviaron campos para actualizar." });
    }
    
    valores.push(id);
    db.run(`UPDATE ${entityName} SET ${campos.join(", ")} WHERE id = ?`, valores, function(err) {
      if (err) {
        return res.status(500).json({ error: `Erro ao modificar ${entityNameLower}: ` + err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: `${entityName} não encontrado` });
      }
      res.json({ message: `${entityName} modificado com sucesso!` });
    });
  });

  // DELETE - Eliminar
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    operations.excluir.run(id, function(err) {
      if (err) {
        return res.status(500).json({ error: `Erro ao excluir ${entityNameLower}: ` + err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: `${entityName} não encontrado` });
      }
      res.json({ message: `${entityName} excluído com sucesso!` });
    });
  });

  return router;
};

// Configurar rutas usando Express Router
app.use('/migrantes', createExpressRoutes('Migrantes', migrantesOps, validateMigrante));
app.use('/empresas', createExpressRoutes('Empresas', empresasOps, validateEmpresa));

// Ruta especial para limpiar empresas sin CNPJ
app.get('/limpiar-empresas-sin-cnpj', (req, res) => {
  db.run("DELETE FROM Empresas WHERE cnpj IS NULL OR cnpj = ''", [], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao limpar empresas: ' + err.message });
    }
    res.json({ 
      message: 'Empresas sem CNPJ removidas com sucesso!', 
      changes: this.changes 
    });
  });
});

// Ruta para información de la API
app.get('/', (req, res) => {
  res.json({
    message: 'API Migrantes e Empresas',
    version: '2.0.0',
    endpoints: {
      migrantes: '/migrantes',
      empresas: '/empresas',
      utils: '/limpiar-empresas-sin-cnpj'
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  });
});

// Middleware para rutas no encontradas (corregir el uso de wildcard)
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
  console.log(`API disponível em: http://localhost:${port}`);
});
