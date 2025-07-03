-- Estrutura de Base de Dados Relacional para Esboço Alóctone
-- Sistema completo com tabelas normalizadas e relacionamentos

-- ========================================
-- TABELAS DE NORMALIZAÇÃO (Dados de apoio)
-- ========================================

-- Países
CREATE TABLE IF NOT EXISTS Paises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT UNIQUE NOT NULL,
    continente TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Setores empresariais
CREATE TABLE IF NOT EXISTS Setores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT UNIQUE NOT NULL,
    descricao TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Habilidades/Competências
CREATE TABLE IF NOT EXISTS Habilidades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT UNIQUE NOT NULL,
    categoria TEXT NOT NULL, -- 'tecnica', 'soft_skill', 'idioma'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Idiomas
CREATE TABLE IF NOT EXISTS Idiomas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tipos de ajuda/benefícios
CREATE TABLE IF NOT EXISTS TiposAjuda (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT UNIQUE NOT NULL,
    descricao TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- TABELAS DE PROCESSO SELETIVO
-- ========================================

-- Candidaturas (compatível com as tabelas existentes)
CREATE TABLE IF NOT EXISTS Candidaturas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    migrante_id INTEGER NOT NULL,
    vaga_id INTEGER NOT NULL,
    
    -- Status do processo
    status TEXT CHECK(status IN ('candidatado', 'em_analise', 'entrevista_agendada', 'entrevista_realizada', 'aprovado', 'reprovado', 'contratado', 'desistiu')) DEFAULT 'candidatado',
    data_candidatura DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Informações adicionais
    carta_apresentacao TEXT,
    pretensao_salarial DECIMAL(10,2),
    observacoes_empresa TEXT,
    feedback_empresa TEXT,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (migrante_id) REFERENCES Migrantes(id),
    FOREIGN KEY (vaga_id) REFERENCES Vagas(id),
    UNIQUE(migrante_id, vaga_id)
);

-- ========================================
-- DADOS INICIAIS (Seeding)
-- ========================================

-- Inserir países comuns
INSERT OR IGNORE INTO Paises (nome, continente) VALUES
('Brasil', 'América do Sul'),
('Venezuela', 'América do Sul'),
('Haiti', 'América Central'),
('Síria', 'Ásia'),
('Argentina', 'América do Sul'),
('Colombia', 'América do Sul'),
('Peru', 'América do Sul'),
('Bolívia', 'América do Sul'),
('Paraguai', 'América do Sul'),
('Uruguai', 'América do Sul'),
('Equador', 'América do Sul'),
('Chile', 'América do Sul'),
('México', 'América do Norte'),
('Estados Unidos', 'América do Norte'),
('Canadá', 'América do Norte');

-- Inserir setores empresariais
INSERT OR IGNORE INTO Setores (nome, descricao) VALUES
('Tecnologia', 'Empresas de software, hardware e TI'),
('Saúde', 'Hospitais, clínicas e empresas farmacêuticas'),
('Educação', 'Escolas, universidades e empresas educacionais'),
('Comércio', 'Varejo, atacado e e-commerce'),
('Indústria', 'Manufatura e produção industrial'),
('Serviços', 'Consultoria, limpeza, segurança'),
('Alimentação', 'Restaurantes, lanchonetes, delivery'),
('Construção', 'Construtoras e empresas de engenharia'),
('Transporte', 'Logística, transporte urbano e cargas'),
('Financeiro', 'Bancos, fintech e seguradoras'),
('Turismo', 'Hotéis, agências de viagem, turismo'),
('Agricultura', 'Agronegócio e produção rural'),
('Energia', 'Petróleo, gás, energia renovável'),
('Entretenimento', 'Mídia, jogos, eventos'),
('Telecomunicações', 'Telefonia, internet, comunicações');

-- Inserir habilidades comuns
INSERT OR IGNORE INTO Habilidades (nome, categoria) VALUES
-- Habilidades técnicas
('JavaScript', 'tecnica'),
('Python', 'tecnica'),
('React', 'tecnica'),
('SQL', 'tecnica'),
('Excel Avançado', 'tecnica'),
('Photoshop', 'tecnica'),
('AutoCAD', 'tecnica'),
('Soldagem', 'tecnica'),
('Enfermagem', 'tecnica'),
('Culinária', 'tecnica'),
('Marketing Digital', 'tecnica'),
('Contabilidade', 'tecnica'),
('Administração', 'tecnica'),
('Vendas', 'tecnica'),
('Atendimento ao Cliente', 'tecnica'),

-- Soft skills
('Comunicação', 'soft_skill'),
('Liderança', 'soft_skill'),
('Trabalho em Equipe', 'soft_skill'),
('Resolução de Problemas', 'soft_skill'),
('Adaptabilidade', 'soft_skill'),
('Criatividade', 'soft_skill'),
('Organização', 'soft_skill'),
('Proatividade', 'soft_skill'),
('Flexibilidade', 'soft_skill'),
('Responsabilidade', 'soft_skill');

-- Inserir idiomas
INSERT OR IGNORE INTO Idiomas (nome) VALUES
('Português'),
('Inglês'),
('Espanhol'),
('Francês'),
('Árabe'),
('Italiano'),
('Alemão'),
('Chinês'),
('Japonês'),
('Russo'),
('Hindi'),
('Coreano');

-- Inserir tipos de ajuda
INSERT OR IGNORE INTO TiposAjuda (nome, descricao) VALUES
('Documentação', 'Ajuda com documentos legais e vistos'),
('Capacitação', 'Treinamentos e cursos de qualificação'),
('Idioma Português', 'Aulas de português como segunda língua'),
('Moradia', 'Auxílio com habitação temporária'),
('Transporte', 'Vale-transporte ou auxílio-deslocamento'),
('Alimentação', 'Vale-refeição ou cesta básica'),
('Saúde', 'Plano de saúde ou assistência médica'),
('Integração Cultural', 'Programas de adaptação cultural'),
('Mentoria Profissional', 'Acompanhamento e orientação de carreira'),
('Apoio Psicológico', 'Suporte emocional e terapêutico');
