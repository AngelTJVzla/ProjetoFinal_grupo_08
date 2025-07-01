import sqlite3pkg from 'sqlite3';
const sqlite3 = sqlite3pkg.verbose();

// Script de migración para crear las nuevas tablas relacionales
const db = new sqlite3.Database("empresa.db", (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados: " + err.message);
  } else {
    console.log("Conectado ao banco de dados empresa.db para migração.");
  }
});

// Función para ejecutar queries de forma secuencial
const runQuery = (query, description) => {
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (err) {
        console.error(`Erro ao ${description}: ` + err.message);
        reject(err);
      } else {
        console.log(`✅ ${description} - OK`);
        resolve();
      }
    });
  });
};

// Función para insertar datos iniciales
const insertData = (query, data, description) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(query);
    data.forEach(row => {
      stmt.run(row, (err) => {
        if (err && !err.message.includes('UNIQUE constraint failed')) {
          console.error(`Erro ao inserir ${description}: ` + err.message);
        }
      });
    });
    stmt.finalize((err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`✅ Dados iniciais de ${description} inseridos - OK`);
        resolve();
      }
    });
  });
};

async function runMigration() {
  try {
    console.log("🚀 Iniciando migração do banco de dados...\n");

    // 1. Criar tabela Setores
    await runQuery(`
      CREATE TABLE IF NOT EXISTS Setores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT UNIQUE NOT NULL,
        descricao TEXT
      )
    `, "criar tabela Setores");

    // 2. Criar tabela Paises
    await runQuery(`
      CREATE TABLE IF NOT EXISTS Paises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT UNIQUE NOT NULL,
        codigo TEXT UNIQUE,
        continente TEXT
      )
    `, "criar tabela Paises");

    // 3. Criar tabela Habilidades
    await runQuery(`
      CREATE TABLE IF NOT EXISTS Habilidades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT UNIQUE NOT NULL,
        categoria TEXT
      )
    `, "criar tabela Habilidades");

    // 4. Criar tabela Idiomas
    await runQuery(`
      CREATE TABLE IF NOT EXISTS Idiomas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT UNIQUE NOT NULL,
        codigo TEXT UNIQUE
      )
    `, "criar tabela Idiomas");

    // 5. Criar tabela TiposAjuda
    await runQuery(`
      CREATE TABLE IF NOT EXISTS TiposAjuda (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT UNIQUE NOT NULL,
        descricao TEXT
      )
    `, "criar tabela TiposAjuda");

    // 6. Criar tabela Vagas
    await runQuery(`
      CREATE TABLE IF NOT EXISTS Vagas (
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
        data_limite DATETIME,
        FOREIGN KEY (empresa_id) REFERENCES Empresas(id) ON DELETE CASCADE
      )
    `, "criar tabela Vagas");

    // 7. Criar tabela Candidaturas
    await runQuery(`
      CREATE TABLE IF NOT EXISTS Candidaturas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        migrante_id INTEGER NOT NULL,
        vaga_id INTEGER NOT NULL,
        status TEXT DEFAULT 'pendente',
        data_candidatura DATETIME DEFAULT CURRENT_TIMESTAMP,
        mensagem TEXT,
        FOREIGN KEY (migrante_id) REFERENCES Migrantes(id) ON DELETE CASCADE,
        FOREIGN KEY (vaga_id) REFERENCES Vagas(id) ON DELETE CASCADE,
        UNIQUE(migrante_id, vaga_id)
      )
    `, "criar tabela Candidaturas");

    // 8. Criar tabela MigranteHabilidades
    await runQuery(`
      CREATE TABLE IF NOT EXISTS MigranteHabilidades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        migrante_id INTEGER NOT NULL,
        habilidade_id INTEGER NOT NULL,
        nivel TEXT,
        FOREIGN KEY (migrante_id) REFERENCES Migrantes(id) ON DELETE CASCADE,
        FOREIGN KEY (habilidade_id) REFERENCES Habilidades(id) ON DELETE CASCADE,
        UNIQUE(migrante_id, habilidade_id)
      )
    `, "criar tabela MigranteHabilidades");

    // 9. Criar tabela VagaHabilidades
    await runQuery(`
      CREATE TABLE IF NOT EXISTS VagaHabilidades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vaga_id INTEGER NOT NULL,
        habilidade_id INTEGER NOT NULL,
        nivel_requerido TEXT,
        obrigatoria BOOLEAN DEFAULT 0,
        FOREIGN KEY (vaga_id) REFERENCES Vagas(id) ON DELETE CASCADE,
        FOREIGN KEY (habilidade_id) REFERENCES Habilidades(id) ON DELETE CASCADE,
        UNIQUE(vaga_id, habilidade_id)
      )
    `, "criar tabela VagaHabilidades");

    // 10. Criar tabela MigranteIdiomas
    await runQuery(`
      CREATE TABLE IF NOT EXISTS MigranteIdiomas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        migrante_id INTEGER NOT NULL,
        idioma_id INTEGER NOT NULL,
        nivel TEXT,
        FOREIGN KEY (migrante_id) REFERENCES Migrantes(id) ON DELETE CASCADE,
        FOREIGN KEY (idioma_id) REFERENCES Idiomas(id) ON DELETE CASCADE,
        UNIQUE(migrante_id, idioma_id)
      )
    `, "criar tabela MigranteIdiomas");

    // 11. Criar tabela Experiencias
    await runQuery(`
      CREATE TABLE IF NOT EXISTS Experiencias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        migrante_id INTEGER NOT NULL,
        empresa TEXT NOT NULL,
        cargo TEXT NOT NULL,
        descricao TEXT,
        data_inicio DATE,
        data_fim DATE,
        ativo BOOLEAN DEFAULT 0,
        pais TEXT,
        FOREIGN KEY (migrante_id) REFERENCES Migrantes(id) ON DELETE CASCADE
      )
    `, "criar tabela Experiencias");

    // 12. Criar tabela EmpresaTiposAjuda
    await runQuery(`
      CREATE TABLE IF NOT EXISTS EmpresaTiposAjuda (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        empresa_id INTEGER NOT NULL,
        tipo_ajuda_id INTEGER NOT NULL,
        detalhes TEXT,
        FOREIGN KEY (empresa_id) REFERENCES Empresas(id) ON DELETE CASCADE,
        FOREIGN KEY (tipo_ajuda_id) REFERENCES TiposAjuda(id) ON DELETE CASCADE,
        UNIQUE(empresa_id, tipo_ajuda_id)
      )
    `, "criar tabela EmpresaTiposAjuda");

    // 13. Adicionar colunas para referencias nas tablas existentes
    try {
      await runQuery(`ALTER TABLE Migrantes ADD COLUMN pais_id INTEGER`, "adicionar coluna pais_id em Migrantes");
    } catch (err) {
      console.log("⚠️  Coluna pais_id já existe em Migrantes");
    }

    try {
      await runQuery(`ALTER TABLE Empresas ADD COLUMN setor_id INTEGER`, "adicionar coluna setor_id em Empresas");
    } catch (err) {
      console.log("⚠️  Coluna setor_id já existe em Empresas");
    }

    // INSERIR DADOS INICIAIS
    console.log("\n📊 Inserindo dados iniciais...\n");

    // Setores
    await insertData(
      `INSERT OR IGNORE INTO Setores (nome, descricao) VALUES (?, ?)`,
      [
        ['Tecnologia', 'Empresas de desenvolvimento de software, TI e inovação'],
        ['Saúde', 'Hospitais, clínicas e serviços de saúde'],
        ['Educação', 'Instituições de ensino e treinamento'],
        ['Construção Civil', 'Construtoras e empresas de engenharia'],
        ['Alimentação', 'Restaurantes, food service e indústria alimentícia'],
        ['Varejo', 'Lojas, comércio e vendas'],
        ['Serviços', 'Prestação de serviços diversos'],
        ['Indústria', 'Manufatura e produção industrial'],
        ['Turismo', 'Hotéis, agências de viagem e turismo'],
        ['Transporte', 'Logística, transportes e entregas']
      ],
      "setores"
    );

    // Países
    await insertData(
      `INSERT OR IGNORE INTO Paises (nome, codigo, continente) VALUES (?, ?, ?)`,
      [
        ['Brasil', 'BR', 'América do Sul'],
        ['Venezuela', 'VE', 'América do Sul'],
        ['Colômbia', 'CO', 'América do Sul'],
        ['Peru', 'PE', 'América do Sul'],
        ['Argentina', 'AR', 'América do Sul'],
        ['Equador', 'EC', 'América do Sul'],
        ['Bolívia', 'BO', 'América do Sul'],
        ['Chile', 'CL', 'América do Sul'],
        ['Uruguai', 'UY', 'América do Sul'],
        ['Paraguai', 'PY', 'América do Sul'],
        ['Haiti', 'HT', 'América Central'],
        ['Cuba', 'CU', 'América Central']
      ],
      "países"
    );

    // Habilidades
    await insertData(
      `INSERT OR IGNORE INTO Habilidades (nome, categoria) VALUES (?, ?)`,
      [
        // Técnicas
        ['JavaScript', 'Técnica'],
        ['Python', 'Técnica'],
        ['React', 'Técnica'],
        ['Node.js', 'Técnica'],
        ['SQL', 'Técnica'],
        ['HTML/CSS', 'Técnica'],
        ['Photoshop', 'Técnica'],
        ['Excel', 'Técnica'],
        ['AutoCAD', 'Técnica'],
        ['Soldagem', 'Técnica'],
        ['Costura', 'Técnica'],
        ['Culinária', 'Técnica'],
        ['Enfermagem', 'Técnica'],
        ['Contabilidade', 'Técnica'],
        
        // Soft Skills
        ['Comunicação', 'Soft Skill'],
        ['Liderança', 'Soft Skill'],
        ['Trabalho em Equipe', 'Soft Skill'],
        ['Resolução de Problemas', 'Soft Skill'],
        ['Adaptabilidade', 'Soft Skill'],
        ['Criatividade', 'Soft Skill'],
        ['Organização', 'Soft Skill'],
        ['Proatividade', 'Soft Skill']
      ],
      "habilidades"
    );

    // Idiomas
    await insertData(
      `INSERT OR IGNORE INTO Idiomas (nome, codigo) VALUES (?, ?)`,
      [
        ['Português', 'pt'],
        ['Espanhol', 'es'],
        ['Inglês', 'en'],
        ['Francês', 'fr'],
        ['Italiano', 'it'],
        ['Alemão', 'de'],
        ['Creole', 'ht']
      ],
      "idiomas"
    );

    // Tipos de Ajuda
    await insertData(
      `INSERT OR IGNORE INTO TiposAjuda (nome, descricao) VALUES (?, ?)`,
      [
        ['Documentação', 'Auxílio com documentos e regularização'],
        ['Capacitação', 'Cursos e treinamentos profissionais'],
        ['Moradia', 'Auxílio com habitação temporária'],
        ['Idioma', 'Aulas de português e outros idiomas'],
        ['Saúde', 'Assistência médica e psicológica'],
        ['Jurídico', 'Orientação e assistência jurídica'],
        ['Alimentação', 'Fornecimento de alimentação'],
        ['Transporte', 'Auxílio com transporte urbano'],
        ['Educação', 'Acesso à educação formal'],
        ['Inclusão Social', 'Atividades de integração social']
      ],
      "tipos de ajuda"
    );

    console.log("\n🎉 Migração concluída com sucesso!");
    console.log("✅ Todas as tabelas relacionais foram criadas");
    console.log("✅ Dados iniciais foram inseridos");
    console.log("\nAgora você pode usar o sistema com funcionalidades relacionais!\n");

  } catch (error) {
    console.error("❌ Erro durante a migração:", error);
  } finally {
    db.close((err) => {
      if (err) {
        console.error("Erro ao fechar o banco: " + err.message);
      } else {
        console.log("Conexão com o banco de dados fechada.");
      }
    });
  }
}

// Executar migração
runMigration();
