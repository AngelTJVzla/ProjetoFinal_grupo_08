const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Conectar a la base de datos
const dbPath = path.join(__dirname, 'empresa.db');
const db = new sqlite3.Database(dbPath);

// Habilidades adicionales para migrantes
const novasHabilidades = [
    { nome: 'Pedreiro', categoria: 'tecnica' },
    { nome: 'Eletricista', categoria: 'tecnica' },
    { nome: 'Encanador', categoria: 'tecnica' },
    { nome: 'Pintor', categoria: 'tecnica' },
    { nome: 'Carpinteiro', categoria: 'tecnica' },
    { nome: 'Cozinheiro', categoria: 'tecnica' },
    { nome: 'Garçom', categoria: 'tecnica' },
    { nome: 'Limpeza e Conservação', categoria: 'tecnica' },
    { nome: 'Motorista', categoria: 'tecnica' },
    { nome: 'Vendedor', categoria: 'tecnica' },
    { nome: 'Cabeleireiro', categoria: 'tecnica' },
    { nome: 'Manicure', categoria: 'tecnica' },
    { nome: 'Mecânico', categoria: 'tecnica' },
    { nome: 'Segurança', categoria: 'tecnica' },
    { nome: 'Jardineiro', categoria: 'tecnica' },
    { nome: 'Cuidador de Idosos', categoria: 'tecnica' },
    { nome: 'Auxiliar de Cozinha', categoria: 'tecnica' },
    { nome: 'Recepcionista', categoria: 'tecnica' },
    { nome: 'Professor', categoria: 'tecnica' },
    { nome: 'Tradutor', categoria: 'tecnica' },
    { nome: 'Intérprete', categoria: 'tecnica' },
    { nome: 'Operador de Máquinas', categoria: 'tecnica' },
    { nome: 'Auxiliar de Produção', categoria: 'tecnica' },
    { nome: 'Conferente', categoria: 'tecnica' },
    { nome: 'Estoquista', categoria: 'tecnica' },
    { nome: 'Porteiro', categoria: 'tecnica' },
    { nome: 'Zelador', categoria: 'tecnica' },
    { nome: 'Entregador', categoria: 'tecnica' },
    { nome: 'Operador de Caixa', categoria: 'tecnica' },
    { nome: 'Barbeiro', categoria: 'tecnica' },
    { nome: 'Costureiro', categoria: 'tecnica' },
    { nome: 'Padeiro', categoria: 'tecnica' },
    { nome: 'Açougueiro', categoria: 'tecnica' },
    { nome: 'Empacotador', categoria: 'tecnica' },
    { nome: 'Auxiliar Administrativo', categoria: 'tecnica' }
];

// Inserir habilidades
let inseridos = 0;
let erros = 0;

console.log('Iniciando inserção de habilidades...');

novasHabilidades.forEach((habilidade, index) => {
    db.run('INSERT OR IGNORE INTO Habilidades (nome, categoria) VALUES (?, ?)', 
           [habilidade.nome, habilidade.categoria], 
           function(err) {
        if (err) {
            console.error(`Erro ao inserir ${habilidade.nome}:`, err.message);
            erros++;
        } else if (this.changes > 0) {
            console.log(`✓ Inserido: ${habilidade.nome}`);
            inseridos++;
        } else {
            console.log(`- Já existe: ${habilidade.nome}`);
        }
        
        // Verificar se é o último item
        if (index === novasHabilidades.length - 1) {
            console.log(`\nResumo:`);
            console.log(`- Habilidades inseridas: ${inseridos}`);
            console.log(`- Erros: ${erros}`);
            console.log(`- Total processadas: ${novasHabilidades.length}`);
            
            // Fechar a conexão
            db.close((err) => {
                if (err) {
                    console.error('Erro ao fechar conexão:', err.message);
                } else {
                    console.log('Conexão com a base de dados fechada.');
                }
            });
        }
    });
});
