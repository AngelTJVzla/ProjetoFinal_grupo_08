import express from 'express';
import cors from 'cors';
import sqlite3pkg from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// ========================================
// CONFIGURAÇÃO DA BASE DE DADOS RELACIONAL
// ========================================

// Conexión con la base de datos
const db = new sqlite3.Database("empresa.db", (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados: " + err.message);
  } else {
    console.log("Conectado ao banco de dados empresa.db.");
    
    // Executar o schema relacional
    const schemaPath = path.join(__dirname, 'database_schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      // Executar cada comando SQL separadamente
      const commands = schema.split(';').filter(cmd => cmd.trim());
      let commandsExecuted = 0;
      
      commands.forEach((command, index) => {
        if (command.trim()) {
          db.run(command, (err) => {
            commandsExecuted++;
            if (err) {
              console.error(`Erro ao executar comando ${index + 1}:`, err.message);
            }
            
            if (commandsExecuted === commands.length) {
              console.log(`✅ Schema relacional aplicado com sucesso! (${commandsExecuted} comandos)`);
            }
          });
        }
      });
    } else {
      console.warn("⚠️  Arquivo database_schema.sql não encontrado. Criando tabelas básicas...");
      createBasicTables();
    }
  }
});

// Função para criar tabelas básicas se o schema não existir
function createBasicTables() {
  // Tabelas básicas existentes (para compatibilidade)
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

  // Tabela de vagas
  db.run(
    `CREATE TABLE IF NOT EXISTS Vagas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        empresa_id INTEGER NOT NULL,
        titulo TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        salario DECIMAL(10,2),
        tipo_contrato TEXT,
        nivel_experiencia TEXT,
        modalidade TEXT,
        requisitos TEXT,
        beneficios TEXT,
        ativa BOOLEAN DEFAULT 1,
        data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
        data_limite DATE,
        FOREIGN KEY (empresa_id) REFERENCES Empresas(id)
    )`,
    (err) => {
      if (err) {
        console.error("Erro ao criar a tabela Vagas: " + err.message);
      } else {
        console.log("Tabela Vagas criada ou já existe.");
      }
    }
  );
}

// ========================================
// VALIDACIONES
// ========================================

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

const validateVaga = (data) => {
  const errors = [];
  if (!data.empresa_id) errors.push('Empresa é obrigatória');
  if (!data.titulo || data.titulo.trim() === '') errors.push('Título é obrigatório');
  if (!data.descripcion || data.descripcion.trim() === '') errors.push('Descrição é obrigatória');
  return errors;
};

const validateCandidatura = (data) => {
  const errors = [];
  if (!data.migrante_id) errors.push('Migrante é obrigatório');
  if (!data.vaga_id) errors.push('Vaga é obrigatória');
  return errors;
};

// ========================================
// FUNÇÕES UTILITÁRIAS PARA QUERIES RELACIONAIS
// ========================================

// Função para buscar vagas com informações da empresa
const buscarVagasComEmpresa = (callback) => {
  const query = `
    SELECT 
      v.*,
      e.nombre as empresa_nombre,
      s.nome as setor_nome
    FROM Vagas v
    LEFT JOIN Empresas e ON v.empresa_id = e.id
    LEFT JOIN Setores s ON e.setor_id = s.id
    WHERE v.ativa = 1
    ORDER BY v.data_criacao DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar vagas com empresa:', err.message);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

// Função para buscar migrantes com habilidades
const buscarMigrantesComHabilidades = (callback) => {
  const query = `
    SELECT 
      m.*,
      p.nome as pais_nome,
      GROUP_CONCAT(h.nome) as habilidades_lista
    FROM Migrantes m
    LEFT JOIN Paises p ON m.pais_origem_id = p.id
    LEFT JOIN MigranteHabilidades mh ON m.id = mh.migrante_id
    LEFT JOIN Habilidades h ON mh.habilidade_id = h.id
    GROUP BY m.id
    ORDER BY m.created_at DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar migrantes com habilidades:', err.message);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

// Função para buscar empresas com setores
const buscarEmpresasComSetores = (callback) => {
  const query = `
    SELECT 
      e.*,
      s.nome as setor_nome,
      COUNT(v.id) as total_vagas_ativas
    FROM Empresas e
    LEFT JOIN Setores s ON e.setor_id = s.id
    LEFT JOIN Vagas v ON e.id = v.empresa_id AND v.ativa = 1
    WHERE e.ativo = 1
    GROUP BY e.id
    ORDER BY e.created_at DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar empresas com setores:', err.message);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};
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

// ========================================
// NUEVOS ENDPOINTS RELACIONALES
// ========================================

// VAGAS - Gestión de ofertas de trabajo
app.get('/vagas', (req, res) => {
  const query = `
    SELECT v.*, e.nombre as empresa_nombre, s.nome as setor_nome 
    FROM Vagas v 
    JOIN Empresas e ON v.empresa_id = e.id 
    LEFT JOIN Setores s ON e.setor_id = s.id
    WHERE v.ativa = 1
    ORDER BY v.data_criacao DESC
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar vagas: ' + err.message });
    }
    res.json(rows);
  });
});

app.post('/vagas', (req, res) => {
  const { empresa_id, titulo, descripcion, salario, tipo_contrato, nivel_experiencia, modalidade, requisitos, beneficios, data_limite } = req.body;
  
  if (!empresa_id || !titulo || !descripcion) {
    return res.status(400).json({ error: 'Empresa ID, título e descrição são obrigatórios' });
  }

  const query = `
    INSERT INTO Vagas (empresa_id, titulo, descripcion, salario, tipo_contrato, nivel_experiencia, modalidade, requisitos, beneficios, data_limite)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.run(query, [empresa_id, titulo, descripcion, salario, tipo_contrato, nivel_experiencia, modalidade, requisitos, beneficios, data_limite], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar vaga: ' + err.message });
    }
    res.status(201).json({ id: this.lastID, message: 'Vaga criada com sucesso!' });
  });
});

app.put('/vagas/:id', (req, res) => {
  const { id } = req.params;
  const { empresa_id, titulo, descripcion, salario, tipo_contrato, nivel_experiencia, modalidade, requisitos, beneficios, data_limite } = req.body;
  
  if (!empresa_id || !titulo || !descripcion) {
    return res.status(400).json({ error: 'Empresa ID, título e descrição são obrigatórios' });
  }

  const query = `
    UPDATE Vagas 
    SET empresa_id = ?, titulo = ?, descripcion = ?, salario = ?, tipo_contrato = ?, 
        nivel_experiencia = ?, modalidade = ?, requisitos = ?, beneficios = ?, data_limite = ?
    WHERE id = ?
  `;
  
  db.run(query, [empresa_id, titulo, descripcion, salario, tipo_contrato, nivel_experiencia, modalidade, requisitos, beneficios, data_limite, id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar vaga: ' + err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Vaga não encontrada' });
    }
    res.json({ message: 'Vaga atualizada com sucesso!' });
  });
});

app.delete('/vagas/:id', (req, res) => {
  const { id } = req.params;
  
  // Primeiro verificar se a vaga existe
  db.get('SELECT id FROM Vagas WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao verificar vaga: ' + err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Vaga não encontrada' });
    }
    
    // Deletar candidaturas relacionadas primeiro
    db.run('DELETE FROM Candidaturas WHERE vaga_id = ?', [id], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao deletar candidaturas relacionadas: ' + err.message });
      }
      
      // Agora deletar a vaga
      db.run('DELETE FROM Vagas WHERE id = ?', [id], function(err) {
        if (err) {
          return res.status(500).json({ error: 'Erro ao deletar vaga: ' + err.message });
        }
        res.json({ message: 'Vaga deletada com sucesso!' });
      });
    });
  });
});

app.get('/empresas/:id/vagas', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT * FROM Vagas 
    WHERE empresa_id = ? 
    ORDER BY data_criacao DESC
  `;
  db.all(query, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar vagas da empresa: ' + err.message });
    }
    res.json(rows);
  });
});

// CANDIDATURAS - Gestión de aplicaciones (endpoint movido para seção relacional)

app.get('/migrantes/:id/candidaturas', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT c.*, v.titulo as vaga_titulo, e.nombre as empresa_nombre 
    FROM Candidaturas c 
    JOIN Vagas v ON c.vaga_id = v.id 
    JOIN Empresas e ON v.empresa_id = e.id 
    WHERE c.migrante_id = ? 
    ORDER BY c.data_candidatura DESC
  `;
  db.all(query, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar candidaturas: ' + err.message });
    }
    res.json(rows);
  });
});

app.get('/vagas/:id/candidatos', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT c.*, m.nombre as migrante_nome, m.email, p.nome as pais_nome 
    FROM Candidaturas c 
    JOIN Migrantes m ON c.migrante_id = m.id 
    LEFT JOIN Paises p ON m.pais_id = p.id 
    WHERE c.vaga_id = ? 
    ORDER BY c.data_candidatura DESC
  `;
  db.all(query, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar candidatos: ' + err.message });
    }
    res.json(rows);
  });
});

app.put('/candidaturas/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!['pendente', 'analisando', 'aprovado', 'rejeitado'].includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }

  db.run('UPDATE Candidaturas SET status = ? WHERE id = ?', [status, id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar status: ' + err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Candidatura não encontrada' });
    }
    res.json({ message: 'Status atualizado com sucesso!' });
  });
});

// DADOS DE APOIO - Setores, Países, Habilidades, etc.
app.get('/setores', (req, res) => {
  db.all('SELECT * FROM Setores ORDER BY nome', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar setores: ' + err.message });
    }
    res.json(rows);
  });
});

app.get('/paises', (req, res) => {
  db.all('SELECT * FROM Paises ORDER BY nome', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar países: ' + err.message });
    }
    res.json(rows);
  });
});

app.get('/habilidades', (req, res) => {
  db.all('SELECT * FROM Habilidades ORDER BY categoria, nome', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar habilidades: ' + err.message });
    }
    res.json(rows);
  });
});

app.get('/idiomas', (req, res) => {
  db.all('SELECT * FROM Idiomas ORDER BY nome', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar idiomas: ' + err.message });
    }
    res.json(rows);
  });
});

app.get('/tipos-ajuda', (req, res) => {
  db.all('SELECT * FROM TiposAjuda ORDER BY nome', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar tipos de ajuda: ' + err.message });
    }
    res.json(rows);
  });
});

// HABILIDADES DE MIGRANTES
app.post('/migrantes/:id/habilidades', (req, res) => {
  const { id } = req.params;
  const { habilidade_id, nivel } = req.body;
  
  const query = `INSERT INTO MigranteHabilidades (migrante_id, habilidade_id, nivel) VALUES (?, ?, ?)`;
  
  db.run(query, [id, habilidade_id, nivel], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao adicionar habilidade: ' + err.message });
    }
    res.status(201).json({ message: 'Habilidade adicionada com sucesso!' });
  });
});

app.get('/migrantes/:id/habilidades', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT mh.*, h.nome, h.categoria 
    FROM MigranteHabilidades mh 
    JOIN Habilidades h ON mh.habilidade_id = h.id 
    WHERE mh.migrante_id = ?
  `;
  db.all(query, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar habilidades: ' + err.message });
    }
    res.json(rows);
  });
});

// MATCHING - Sistema de compatibilidade
app.get('/migrantes/:id/vagas-compatibles', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT DISTINCT v.*, e.nombre as empresa_nombre, 
           COUNT(vh.habilidade_id) as habilidades_match
    FROM Vagas v 
    JOIN Empresas e ON v.empresa_id = e.id
    LEFT JOIN VagaHabilidades vh ON v.id = vh.vaga_id
    LEFT JOIN MigranteHabilidades mh ON vh.habilidade_id = mh.habilidade_id 
                                      AND mh.migrante_id = ?
    WHERE v.ativa = 1
    GROUP BY v.id
    ORDER BY habilidades_match DESC, v.data_criacao DESC
    LIMIT 10
  `;
  db.all(query, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar vagas compatíveis: ' + err.message });
    }
    res.json(rows);
  });
});

// Configurar rutas usando Express Router
app.use('/migrantes', createExpressRoutes('Migrantes', migrantesOps, validateMigrante));
app.use('/empresas', createExpressRoutes('Empresas', empresasOps, validateEmpresa));

// ========================================
// ENDPOINTS DO SISTEMA RELACIONAL
// ========================================

// *** DADOS DE APOIO (NORMALIZADOS) ***

// Países
app.get('/paises', (req, res) => {
  db.all('SELECT * FROM Paises ORDER BY nome', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar países: ' + err.message });
    }
    res.json(rows);
  });
});

// Setores
app.get('/setores', (req, res) => {
  db.all('SELECT * FROM Setores ORDER BY nome', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar setores: ' + err.message });
    }
    res.json(rows);
  });
});

// Habilidades
app.get('/habilidades', (req, res) => {
  const { categoria } = req.query;
  let query = 'SELECT * FROM Habilidades';
  let params = [];
  
  if (categoria) {
    query += ' WHERE categoria = ?';
    params.push(categoria);
  }
  
  query += ' ORDER BY categoria, nome';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar habilidades: ' + err.message });
    }
    res.json(rows);
  });
});

// Idiomas
app.get('/idiomas', (req, res) => {
  db.all('SELECT * FROM Idiomas ORDER BY nome', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar idiomas: ' + err.message });
    }
    res.json(rows);
  });
});

// Tipos de Ajuda
app.get('/tipos-ajuda', (req, res) => {
  db.all('SELECT * FROM TiposAjuda ORDER BY nome', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar tipos de ajuda: ' + err.message });
    }
    res.json(rows);
  });
});

// *** VAGAS COM RELACIONAMENTOS ***

// Listar todas as vagas com informações da empresa
app.get('/vagas', (req, res) => {
  buscarVagasComEmpresa((err, vagas) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar vagas: ' + err.message });
    }
    res.json(vagas);
  });
});

// Criar nova vaga
app.post('/vagas', (req, res) => {
  const validationErrors = validateVaga(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({ error: "Dados inválidos", details: validationErrors });
  }

  const {
    empresa_id, titulo, descripcion, salario, tipo_contrato,
    nivel_experiencia, modalidade, requisitos, beneficios,
    data_limite, numero_vagas
  } = req.body;

  const query = `
    INSERT INTO Vagas (
      empresa_id, titulo, descripcion, salario, tipo_contrato,
      nivel_experiencia, modalidade, requisitos, beneficios,
      data_limite, numero_vagas
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [
    empresa_id, titulo, descripcion, salario, tipo_contrato,
    nivel_experiencia, modalidade, requisitos, beneficios,
    data_limite, numero_vagas || 1
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar vaga: ' + err.message });
    }

    res.json({ 
      message: 'Vaga criada com sucesso!', 
      id: this.lastID 
    });
  });
});

// Buscar vaga por ID
app.get('/vagas/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT 
      v.*,
      e.nombre as empresa_nombre,
      e.sector as empresa_setor
    FROM Vagas v
    LEFT JOIN Empresas e ON v.empresa_id = e.id
    WHERE v.id = ?
  `;

  db.get(query, [id], (err, vaga) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar vaga: ' + err.message });
    }
    if (!vaga) {
      return res.status(404).json({ error: 'Vaga não encontrada' });
    }
    res.json(vaga);
  });
});

// Atualizar vaga
app.put('/vagas/:id', (req, res) => {
  const { id } = req.params;
  const validationErrors = validateVaga(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({ error: "Dados inválidos", details: validationErrors });
  }

  const {
    empresa_id, titulo, descripcion, salario, tipo_contrato,
    nivel_experiencia, modalidade, requisitos, beneficios,
    data_limite, numero_vagas, ativa
  } = req.body;

  const query = `
    UPDATE Vagas SET 
      empresa_id = ?, titulo = ?, descripcion = ?, salario = ?, 
      tipo_contrato = ?, nivel_experiencia = ?, modalidade = ?, 
      requisitos = ?, beneficios = ?, data_limite = ?, 
      numero_vagas = ?, ativa = ?
    WHERE id = ?
  `;

  db.run(query, [
    empresa_id, titulo, descripcion, salario, tipo_contrato,
    nivel_experiencia, modalidade, requisitos, beneficios,
    data_limite, numero_vagas || 1, ativa !== undefined ? ativa : 1, id
  ], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar vaga: ' + err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Vaga não encontrada' });
    }
    res.json({ message: 'Vaga atualizada com sucesso!' });
  });
});

// Deletar vaga
app.delete('/vagas/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM Vagas WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar vaga: ' + err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Vaga não encontrada' });
    }
    res.json({ message: 'Vaga deletada com sucesso!' });
  });
});

// *** CANDIDATURAS ***

// Criar candidatura
app.post('/candidaturas', (req, res) => {
  const validationErrors = validateCandidatura(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({ error: "Dados inválidos", details: validationErrors });
  }

  const { migrante_id, vaga_id, carta_apresentacao, pretensao_salarial, disponibilidade_inicio } = req.body;

  const query = `
    INSERT INTO Candidaturas (migrante_id, vaga_id, carta_apresentacao, pretensao_salarial, disponibilidade_inicio) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [migrante_id, vaga_id, carta_apresentacao, pretensao_salarial, disponibilidade_inicio], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Você já se candidatou a esta vaga' });
      }
      return res.status(500).json({ error: 'Erro ao criar candidatura: ' + err.message });
    }
    res.json({ 
      message: 'Candidatura enviada com sucesso!', 
      candidatura_id: this.lastID 
    });
  });
});

// *** VAGAS DA EMPRESA ***

// Listar vagas de uma empresa específica
app.get('/empresas/:id/vagas', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT v.*, e.nombre as empresa_nombre
    FROM Vagas v
    LEFT JOIN Empresas e ON v.empresa_id = e.id
    WHERE v.empresa_id = ?
    ORDER BY v.data_criacao DESC
  `;

  db.all(query, [id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar vagas da empresa: ' + err.message });
    }
    res.json(rows);
  });
});

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
    message: 'API Migrantes e Empresas - Sistema Relacional',
    version: '3.0.0',
    endpoints: {
      // Entidades principais
      migrantes: '/migrantes',
      empresas: '/empresas',
      
      // Funcionalidades relacionais
      vagas: '/vagas',
      candidaturas: '/candidaturas',
      
      // Dados de apoio
      setores: '/setores',
      paises: '/paises',
      habilidades: '/habilidades',
      idiomas: '/idiomas',
      tiposAjuda: '/tipos-ajuda',
      
      // Relacionamentos
      vagasEmpresa: '/empresas/:id/vagas',
      candidaturasMigrante: '/migrantes/:id/candidaturas',
      candidatosVaga: '/vagas/:id/candidatos',
      habilidadesMigrante: '/migrantes/:id/habilidades',
      
      // Sistema de matching
      vagasCompativeis: '/migrantes/:id/vagas-compatibles',
      
      // Utils
      utils: '/limpiar-empresas-sin-cnpj'
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    features: [
      'Sistema de vagas e candidaturas',
      'Matching baseado em habilidades',
      'Dados normalizados (países, setores, habilidades)',
      'Relacionamentos entre entidades',
      'Sistema de status de candidaturas'
    ]
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
